export type Project = {
  slug: string;
  name: string;
  problem: string;
  role: string;
  stack: string[];
  year: number;
  highlight?: string;
  links?: { repo?: string; demo?: string; writeup?: string };
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "crdt-tapes",
    name: "crdt-tapes",
    problem: "Teams argue about merge semantics without a reproducible harness.",
    role: "Sole author · open source",
    stack: ["Rust", "WASM", "TypeScript", "Vitest"],
    year: 2024,
    highlight: "1.8k★ · used in 2 university courses · seeded RNG + snapshot replay",
    links: {
      repo: "https://github.com/silasvarga/crdt-tapes",
      demo: "#",
      writeup: "#writing",
    },
    featured: true,
  },
  {
    slug: "presence-relay",
    name: "Presence Relay",
    problem: "Presence at 50k concurrent cursors without thundering herd.",
    role: "Staff Engineer · Figurative",
    stack: ["Elixir", "Redis Streams", "Cloudflare DO", "TypeScript"],
    year: 2022,
    highlight: "p95 presence delta 42 → 18 ms · −60% origin fanout · 0 incidents after cutover",
    links: { writeup: "#writing" },
    featured: false,
  },
  {
    slug: "patchwork",
    name: "Patchwork",
    problem: "Knob state is harder to sync than text — two hands, one parameter.",
    role: "Solo · side project",
    stack: ["Svelte", "Yjs", "WebRTC", "Web Audio"],
    year: 2023,
    highlight: "<30 ms knob sync on LAN · degrades to WebSocket relay · try the live room",
    links: { demo: "#", repo: "https://github.com/silasvarga/patchwork" },
    featured: false,
  },
  {
    slug: "tape-lint",
    name: "Tape Lint",
    problem: "CRDT payloads inflate silently; CI should catch it before merge.",
    role: "Solo · OSSF tool",
    stack: ["TypeScript", "Biome"],
    year: 2024,
    highlight: "Catches 3–5× payload inflations · 120 repos using it",
    links: { repo: "https://github.com/silasvarga/tape-lint" },
    featured: false,
  },
];
