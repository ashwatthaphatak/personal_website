import { NextRequest, NextResponse } from "next/server";

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const REVALIDATE_SECONDS = 60 * 60 * 24;
const GITHUB_FIRST_PUBLIC_YEAR = 2008;
const DEFAULT_YEAR_WINDOW = 10;

const CONTRIBUTIONS_QUERY = `
  query ContributionsByYear($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionYears
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              weekday
            }
          }
        }
      }
    }
  }
`;

type GitHubGraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionYears: number[];
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              contributionCount: number;
              date: string;
              weekday: number;
            }[];
          }[];
        };
      };
    };
  };
  errors?: { message: string }[];
};

type ContributionDay = {
  contributionCount: number;
  date: string;
  weekday: number;
};

type ContributionWeek = {
  contributionDays: ContributionDay[];
};

type ContributionPayload = {
  years: number[];
  totalContributions: number;
  maxContributionCount: number;
  weeks: ContributionWeek[];
};

function yearRange(year: number) {
  const from = `${year}-01-01T00:00:00Z`;
  const now = new Date();
  const yearEnd = new Date(Date.UTC(year, 11, 31, 23, 59, 59));
  const toDate = year === now.getUTCFullYear() && now < yearEnd ? now : yearEnd;

  return {
    from,
    to: toDate.toISOString()
  };
}

function buildFallbackYears(currentYear: number) {
  const lowerBound = Math.max(GITHUB_FIRST_PUBLIC_YEAR, currentYear - DEFAULT_YEAR_WINDOW + 1);
  const years: number[] = [];

  for (let year = currentYear; year >= lowerBound; year -= 1) {
    years.push(year);
  }

  return years;
}

function readAttribute(tag: string, attribute: string) {
  const match = tag.match(new RegExp(`${attribute}="([^"]*)"`, "i"));
  return match?.[1] ?? "";
}

function parseContributionCount(rawCount: string) {
  const match = rawCount.match(/(\d+)/);
  return match ? Number(match[1]) : 0;
}

function weekdayFromDate(date: string) {
  return new Date(`${date}T00:00:00Z`).getUTCDay();
}

function chunkDaysIntoWeeks(days: ContributionDay[]) {
  const weeks: ContributionWeek[] = [];

  for (let index = 0; index < days.length; index += 7) {
    weeks.push({
      contributionDays: days.slice(index, index + 7)
    });
  }

  return weeks;
}

async function fetchViaGraphQL(username: string, requestedYear: number, githubToken: string) {
  const { from, to } = yearRange(requestedYear);

  const upstreamResponse = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${githubToken}`,
      "Content-Type": "application/json",
      "User-Agent": "ashwatthaphatak-portfolio"
    },
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: {
        username,
        from,
        to
      }
    }),
    next: {
      revalidate: REVALIDATE_SECONDS
    }
  });

  if (!upstreamResponse.ok) {
    throw new Error("GitHub GraphQL request failed.");
  }

  const payload = (await upstreamResponse.json()) as GitHubGraphQLResponse;
  if (payload.errors?.length) {
    throw new Error(payload.errors[0]?.message ?? "GitHub GraphQL error.");
  }

  const collection = payload.data?.user?.contributionsCollection;
  if (!collection) {
    throw new Error("GitHub contributions unavailable for this user.");
  }

  const maxContributionCount = collection.contributionCalendar.weeks.reduce((maxWeek, week) => {
    const weekMax = week.contributionDays.reduce((maxDay, day) => Math.max(maxDay, day.contributionCount), 0);
    return Math.max(maxWeek, weekMax);
  }, 0);

  const responsePayload: ContributionPayload = {
    years: [...collection.contributionYears].sort((a, b) => b - a),
    totalContributions: collection.contributionCalendar.totalContributions,
    maxContributionCount,
    weeks: collection.contributionCalendar.weeks
  };

  return responsePayload;
}

async function fetchViaPublicSvg(username: string, requestedYear: number) {
  const fromDate = `${requestedYear}-01-01`;
  const toDate = `${requestedYear}-12-31`;
  const url = `https://github.com/users/${encodeURIComponent(username)}/contributions?from=${fromDate}&to=${toDate}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "ashwatthaphatak-portfolio"
    },
    next: {
      revalidate: REVALIDATE_SECONDS
    }
  });

  if (!response.ok) {
    throw new Error("GitHub public contributions endpoint failed.");
  }

  const svg = await response.text();
  const rectMatches = svg.match(/<rect[^>]*ContributionCalendar-day[^>]*>/g) ?? [];

  if (rectMatches.length === 0) {
    throw new Error("Unable to parse public contribution data.");
  }

  const days: ContributionDay[] = rectMatches
    .map((tag) => {
      const date = readAttribute(tag, "data-date");
      if (!date) {
        return null;
      }

      const count = parseContributionCount(readAttribute(tag, "data-count"));
      return {
        date,
        contributionCount: count,
        weekday: weekdayFromDate(date)
      } satisfies ContributionDay;
    })
    .filter((day): day is ContributionDay => Boolean(day));

  if (days.length === 0) {
    throw new Error("No contribution days returned for this year.");
  }

  const totalContributions = days.reduce((sum, day) => sum + day.contributionCount, 0);
  const maxContributionCount = days.reduce((max, day) => Math.max(max, day.contributionCount), 0);
  const weeks = chunkDaysIntoWeeks(days);
  const years = buildFallbackYears(new Date().getUTCFullYear());

  const responsePayload: ContributionPayload = {
    years,
    totalContributions,
    maxContributionCount,
    weeks
  };

  return responsePayload;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const yearRaw = searchParams.get("year");
  const requestedYear = yearRaw ? Number(yearRaw) : new Date().getUTCFullYear();

  if (!username) {
    return NextResponse.json({ error: "Missing username." }, { status: 400 });
  }

  if (!Number.isFinite(requestedYear) || requestedYear < 2007 || requestedYear > 2100) {
    return NextResponse.json({ error: "Invalid year." }, { status: 400 });
  }

  const githubToken = process.env.GITHUB_TOKEN ?? process.env.GITHUB_READ_TOKEN;
  try {
    const payload = githubToken
      ? await fetchViaGraphQL(username, requestedYear, githubToken)
      : await fetchViaPublicSvg(username, requestedYear);

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": `s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=43200`
      }
    });
  } catch (graphQlError) {
    try {
      const payload = await fetchViaPublicSvg(username, requestedYear);
      return NextResponse.json(payload, {
        headers: {
          "Cache-Control": `s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=43200`
        }
      });
    } catch (svgError) {
      const message =
        svgError instanceof Error
          ? svgError.message
          : graphQlError instanceof Error
            ? graphQlError.message
            : "Unable to fetch GitHub contributions right now.";

      return NextResponse.json({ error: message }, { status: 502 });
    }
  }
}
