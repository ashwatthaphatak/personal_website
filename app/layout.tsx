import type { Metadata } from "next";
import { Manrope, Space_Mono } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap"
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap"
});

const themeInitializationScript = `
(() => {
  try {
    const key = 'theme-preference';
    const stored = localStorage.getItem(key);
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = stored || system;
    document.documentElement.classList.toggle('dark', theme === 'dark');
  } catch (_) {
    document.documentElement.classList.remove('dark');
  }
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL("https://ashwatthaphatak.com"),
  title: "Ashwattha Phatak | Portfolio",
  description:
    "Personal portfolio of Ashwattha Phatak covering systems software, distributed systems, robotics, and ML/perception engineering.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Ashwattha Phatak | Portfolio",
    description:
      "Systems software, distributed systems, robotics, and ML/perception projects and experience.",
    url: "https://ashwatthaphatak.com",
    siteName: "Ashwattha Phatak Portfolio",
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary",
    title: "Ashwattha Phatak | Portfolio",
    description:
      "Systems software, distributed systems, robotics, and ML/perception projects and experience."
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${manrope.variable} ${spaceMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
      </head>
      <body className="bg-[var(--bg)] text-[var(--text)] antialiased">{children}</body>
    </html>
  );
}
