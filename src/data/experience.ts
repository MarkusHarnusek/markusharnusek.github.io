export type Role = {
  company: string;
  title: string;
  range: string;
  location: string;
  active: boolean;
  bullets: string[];
};

export const experience: Role[] = [
  {
    company: "Independent",
    title: "Real-time Collaboration Consultant",
    range: "2023 — present",
    location: "Berlin · remote",
    active: true,
    bullets: [
      "Advising 5 product teams on sync architecture (Yjs / Automerge / custom CRDTs); most common outcome is ‘you don’t need a CRDT here, you need a better lock’.",
      "Led LiveView → WebRTC migration for a collaborative whiteboard (12k MAU): cut p95 stroke latency 180 ms → 38 ms, kept WebSocket relay as graceful fallback.",
      "Built crdt-tapes — deterministic merge harness now used in two university courses; seeded RNG + snapshot replay caught three payload-inflation regressions pre-merge.",
    ],
  },
  {
    company: "Figurative",
    title: "Staff Engineer, Realtime",
    range: "2019 — 2023",
    location: "Berlin · hybrid",
    active: true,
    bullets: [
      "Owned presence & cursor fanout for 50k+ concurrent editors; moved from Redis pub/sub to sharded Durable-Object fanout — −60% origin traffic, p95 presence delta 42 ms → 18 ms.",
      "Designed conflict UI that made OT vs. CRDT tradeoffs visible to PMs (‘who wins when two people bold the same word?’) — reduced sync-related support tickets by ~40%.",
      "Mentored 4 engineers; introduced TLA+ light specs for the sync core — one spec found a liveness bug three weeks before it would have hit prod.",
    ],
  },
  {
    company: "SoundCloud",
    title: "Backend Engineer, Live Features",
    range: "2016 — 2019",
    location: "Berlin",
    active: false,
    bullets: [
      "Built live timestamped commenting pipeline (Go + Kafka + Postgres) handling ~2k comments/s at peak; added idempotent replay after a double-post incident during a Boiler Room stream.",
      "Prototyped browser synth patch sharing that started the whole multiplayer obsession — never shipped, never forgotten.",
    ],
  },
];
