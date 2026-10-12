export type SkillGroup = {
  label: string;
  note?: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    label: "Daily drivers",
    note: "reach for without thinking",
    items: [
      "TypeScript",
      "Rust (sync cores → WASM)",
      "WebSockets / WebRTC",
      "Yjs / Automerge / CRDTs",
      "Node.js",
      "Postgres",
      "Redis / Streams",
      "Cloudflare Workers & Durable Objects",
    ],
  },
  {
    label: "Comfortable",
    note: "can lead, will ask good questions",
    items: [
      "Elixir",
      "Go",
      "ProseMirror / TipTap",
      "Partykit",
      "Kafka",
      "TLA+ (light)",
      "WASM",
    ],
  },
  {
    label: "Learning / exploring",
    items: [
      "Automerge 2.0 internals",
      "RP2040 / C (hardware sequencer)",
      "Formal verification",
      "OT history & tradeoffs",
    ],
  },
  {
    label: "Studio",
    note: "the other workbench",
    items: ["Ableton Live", "Max/MSP", "Soldering (through-hole)", "DX7 repair", "Juno-60"],
  },
];
