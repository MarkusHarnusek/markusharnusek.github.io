export type Project = {
  slug: string;
  name: string;
  problem: string;
  role: string;
  stack: string[];
  year: number;
  highlight?: string;
  links?: { repo?: string; demo?: string; usage?: string };
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "md-doc",
    name: "MarkDown Doc",
    problem: "An easy to build, modular documentation suite.",
    role: "Duo · Support Project",
    stack: ["HTML", "CSS", "JavaScript"],
    year: 2025,
    highlight: "Config-driven nav & categories · Full-text search & sidebar heading scroll · Simple Translation · Used by GoalFinder for it's documentation",
    links: {
      repo: "https://github.com/MarkusHarnusek/MarkDownDoc",
      usage: "https://goalfinder.github.io/documentation",
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
    links: { repo: "https://github.com/MarkusHarnusek/MarkDownConverter" },
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
