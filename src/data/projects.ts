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
    slug: "palette-picker",
    name: "Palette Picker",
    problem: "Manage color palettes for creative projects",
    role: "Solo · Side Project",
    stack: ["C#", ".NET", "WPF"],
    year: 2025,
    highlight: "Translation into 7 languages · Custom color picker · Automatic palette generation",
    links: { repo: "https://github.com/MarkusHarnusek/Palette-Picker" },
    featured: false,
  },
  {
    slug: "md-converter",
    name: "MarkDown Converter",
    problem: "Simple MarkDown converter with custom feature set",
    role: "Duo · Support Project",
    stack: ["HTML", "JavaScript", "CSS"],
    year: 2025,
    highlight: "Calculation Blocks · Warning, Error, Info & more custom callouts · Image Scaling",
    links: { repo: "https://github.com/silasvarga/patchwork" },
    featured: false,
  },
  {
    slug: "win-wid",
    name: "WinWid",
    problem: "A modern desktop clock application for Windows",
    role: "Solo · Side Project",
    stack: ["C#", ".NET", "WPF"],
    year: 2025,
    highlight: "Highly configurable appearance position and time & date format",
    links: { repo: "https://github.com/MarkusHarnusek/WinWid" },
    featured: false,
  },
];
