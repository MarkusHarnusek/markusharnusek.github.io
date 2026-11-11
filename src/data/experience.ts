export type Role = {
  company: string;
  title: string;
  range: string;
  active: boolean;
  bullets: string[];
};

export const experience: Role[] = [
  {
    company: "BMD",
    title: "Software Engineering Internship",
    range: "August 2026",
    active: false,
    bullets: [
      "Contributed to an automated project scheduling tool that combines project data and employee calendars through the BMD API to plan appointments by rules.",
      "Improved the scheduling algorithm by fixing appointment placement issues, and automated the transfer of generated appointments into the BMD calendar software.",
      "Built the backend with Java and Spring Boot and the frontend with HTML, CSS, and JavaScript.",
    ],
  },
  {
    company: "HTL Leonding",
    title: "\"Embedded Systems\" Club President",
    range: "2026 – present",
    active: true,
    bullets: [
      "Organize and lead monthly club meetups and the club's participation in school events like HTL Leonding's Open House and Club Convention Day.",
      "Manage the club projects' participation in programs like Smart Sport Assistance at the University of Vienna.",
      "Maintain the club's public presence, its area, and its equipment.",
    ],
  },
  {
    company: "HTL Leonding",
    title: "Software Engineering Student",
    range: "2024 – present",
    active: true,
    bullets: [
      "Support classmates in Mathematics and Programming by explaining concepts, troubleshooting problems, and sharing learning resources.",
      "Lead guide for the Erasmus+ school exchange. Accompanied a group of 13 Czech exchange students for 3 days, guided them through lessons at our school, and organised a day trip to Linz in May 2026.",
      "Tutored multiple students in Programming, Mathematics, and Physics through HTL Leonding's tutoring platform.",
    ],
  },
];
