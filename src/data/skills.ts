export type SkillGroup = {
  label: string;
  note?: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    label: "Core Skills",
    note: "well-practiced, confident & capable",
    items: [
        "C",
        "C#",
        "HTML",
        "CSS",
        "WPF",
        "Arduino Framework"
    ],
  },
  {
    label: "Proficient",
    note: "experienced, comfortable building with",
    items: [
        "C++",
        "TypeScripts",
        "JavaScript",
        "Vue.js",
        "WinForms",
        "PlatformIO"
    ],
  },
  {
    label: "Familiar",
    note: "used before, still building confidence",
    items: [
        "Java",
        "Python",
        "PowerShell",
        "Astro",
        "SQL",
        "sqlite"
    ],
  },
  {
    label: "Exploring",
    note: "just getting started",
    items: [
        "Bash",
        "Spring Boot",
        "FreeRTOS"
    ],
  },
  {
    label: "Embedded Development",
    note: "hardware & low-level",
    items: [
        "Through-Hole soldering",
        "Laser cutting",
        "3D-printing",
        "Slicing (Creality Print)",
        "3D-modeling (FreeCAD, TinkerCAD)"
    ],
  },
  {
    label: "Creative Tools",
    note: "miscellaneous skills",
    items: [
      "Adobe Photoshop",
      "Adobe Lightroom",
      "Canva"
    ],
  },
];
