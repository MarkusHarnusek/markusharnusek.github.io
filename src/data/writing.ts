export type Post = {
  slug: string;
  title: string;
  date: string; // ISO
  excerpt: string;
};

export const posts: Post[] = [
  {
    slug: "crdt-tombstones",
    title: "Why your CRDT is slow (it’s the tombstones)",
    date: "2026-02-14",
    excerpt: "Live profiling of Yjs vs. Automerge deletion overhead and the one compaction that actually helps.",
  },
  {
    slug: "durable-objects-fanout",
    title: "Durable Objects vs. classic fanout — notes from a migration",
    date: "2025-11-03",
    excerpt: "What broke, what got simpler, and the Grafana panel that made the decision obvious.",
  },
  {
    slug: "dx7-voice-chip",
    title: "A DX7 voice chip and a lesson in backwards compatibility",
    date: "2025-08-19",
    excerpt: "Fixing a 1983 synth taught me more about versioned state than any RFC.",
  },
];
