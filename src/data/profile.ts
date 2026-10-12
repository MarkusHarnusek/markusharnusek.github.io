export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

export type Profile = {
  name: string;
  pronouns: string;
  location: string;
  role: string;
  tagline: string;
  bio: string;
  currently: { label: string; value: string }[];
  email: string;
  availability: string;
  socials: SocialLink[];
};

export const profile: Profile = {
  name: "Silas Varga",
  pronouns: "he/him",
  location: "Berlin, DE — CET (UTC+1)",
  role: "Real-time collaboration engineer",
  tagline: "Multiplayer is the easy part. Sync is the hard part.",
  bio: `I got into real-time systems sideways — trying to make a browser-based synth patch bay actually stay in sync when two people touched the same knob. That rabbit hole became four years at a multiplayer-infra startup, where I lived inside presence cursors, CRDTs, and the particular humiliation of watching your cursor teleport under load. Before that I was at SoundCloud on live commenting and audio pipelines (TU Berlin CS, 2016). I like systems where you can hear the bug, which is probably why my apartment is half recording studio, half soldering station. When I’m not debugging convergence I’m bouldering — same puzzle, different wall: there’s always a sequence.`,
  currently: [
    { label: "Studying", value: "3rd Grade Software Engineering at HTL Leonding" },
    { label: "Working on", value: "GoalFinder and projects around the Embedded Systems Club" },
    { label: "Exploring", value: "Voice recognition on embedded systems" },
  ],
  email: "silas@varga.build",
  availability: "Available for 3–6 month contracts · next slot late May 2026 · 48h reply",
  socials: [
    { label: "GitHub", href: "https://github.com/silasvarga", handle: "@silasvarga" },
    { label: "Mastodon", href: "https://mastodon.social/@silasvarga", handle: "@silasvarga@mastodon.social" },
    { label: "Blog", href: "#writing", handle: "silasvarga.build/notes" },
  ],
};
