import type { BlogPost } from "@/content/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "is-my-data-hallucinating",
    title: "Is my data hallucinating?",
    summary:
      "A practical note on data integrity failures in autonomous pipelines and why seemingly small preprocessing mistakes can cascade into unsafe behavior.",
    publishedAt: "2025-02-27",
    images: [
      {
        src: "/images/blog/is-my-data-hallucinating-incorrect.jpg",
        alt: "Incorrect LiDAR representation with visibly distorted geometry.",
        caption: "Incorrect Representation"
      },
      {
        src: "/images/blog/is-my-data-hallucinating-correct.jpg",
        alt: "Correct LiDAR representation showing a normal road structure.",
        caption: "Correct Representation"
      }
    ],
    content: [
      "Is my data hallucinating?",
      "The second image looks alright - a nice and normal road. But what in the world is going on in the first image?",
      "Unless my car is going up the Himalayas, that doesn't seem right!",
      "In the realm of data pre-processing, the foundation of Data Integrity is paramount. The two visualizations presented offer a stark juxtaposition: one marred by distorted elements, emphasizing the critical role of a seamless data pipeline. These images serve as a poignant reminder of the challenges pervasive in Machine Learning systems, underscoring the significance of upholding data integrity during conversion and preprocessing.",
      "Even the minutest inaccuracies, such as misinterpretation of calibration parameters or mishandling multi-channel data, which you thought you fixed, can precipitate outcomes akin to the flawed initial image. RCA is like realising your fix just taught the system to lie better. These scenarios seem familiar from my experience of a Site Reliability Engineer (SRE), where it was crucial to identify seemingly inconsequential glitches in system pipelines that could snowball into significant failures.",
      "For autonomous vehicles, the stakes are even higher-data integrity transcends a mere concept to become a safety imperative. Each phase of the pipeline, spanning from decompression to 3D reconstruction, must exude reliability. The repercussions of compromised data integrity are palpable: distorted ground planes impede path planning, misaligned objects compromise obstacle detection accuracy, and errors reverberate throughout the system, influencing subsequent decisions.",
      "In a realm mirroring the meticulous nature of reliability practices, the processing of LiDAR data demands unwavering attention to detail.",
      "Have you navigated the complexities of safeguarding data integrity within intricate systems? How do you tackle anomalies that defy expectations? Your insights are invaluable-share your perspectives below!",
      "(Images sourced from an authentic real-world dataset experiment by yours truly.)"
    ]
  },
  {
    slug: "something-like-napster",
    title: "What even is the point of publishing research",
    summary:
      "Why people remember Napster more than academically stronger systems, and what that says about building distributed systems that reach real users.",
    publishedAt: "2026-02-22",
    content: [
      "\"Something like Napster?\"",
      "\"Exactly like Napster.\"",
      "While most people only know Napster through the movie, a few CS grads still point at the screen and say they have seen that name somewhere before.",
      "When you start reading peer-to-peer systems papers, you quickly realize academia moved past Napster very fast. Research systems like Chord and Pastry addressed many of its limitations and proposed cleaner, more scalable ways to build decentralized systems.",
      "Yet Napster is the name people remember. Not because it was theoretically strong, but because it was a complete product for its time. It worked end to end and reached real users without exposing underlying complexity.",
      "Today, bleeding-edge systems like DynamoDB and Cassandra are well known in the tech world, but they are far more complex than early systems ever were. Their success comes from carefully managing that complexity through replication, failure handling, membership, and constant tuning.",
      "What I find fascinating is that at this scale, tiny improvements in individual components matter. Even minor changes show up in user experience.",
      "As systems continue to grow in scale, especially in a world where AI can generate large amounts of code, the core challenge increasingly lies in managing complex distributed infrastructure. Learning to design and operate these systems is one of the most exciting areas of engineering today."
    ]
  }
];

export function getSortedBlogPosts() {
  return [...blogPosts].sort((a, b) => {
    const aTime = new Date(a.publishedAt).getTime();
    const bTime = new Date(b.publishedAt).getTime();
    return bTime - aTime;
  });
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
