export type Role = {
  company: string;
  title: string;
  range: string;
  active: boolean;
  bullets: string[];
};

export const experience: Role[] = [
  {
    company: "HTL Leonding",
    title: "Software Engineering Student",
    range: "2024 - present",
    active: true,
    bullets: [
      "Support classmates in Mathematics and Programming by explaining concepts, troubleshooting problems, and sharing learning resources.",
      "Lead guide for Erasmus+ School Exchange Program. Accompanied group of 13 Czech exchange students on a 3 day exchange, guiding them trough lessons at our school and organised a day trip to Linz in May 2026.",
      "Successfully tutored multiple students in Programming, Mathematics, and Physics through HTL Leonding’s tutoring platform.",
    ],
  },
  {
    company: "HTL Leonding",
    title: "\"Embedded Systems\" Club President",
    range: "2026 - present",
    active: true,
    bullets: [
      "Organize and lead monthly club meetups and the clubs participation school events like HTL Leonding's Open House and Club Convention Day.",
      "Manage project's participation in programs like Smart Sport Assistance at the University of Vienna.",
      "Maintain club's outside appearance and the club's area and equipment",
    ],
  },
  {
    company: "BMD",
    title: "Software Engineering Internship",
    range: "August 2026",
    active: false,
    bullets: [
      "Contributed to the development and refinement of an automated project scheduling tool at BMD, integrating project data and employee calendars through the BMD API to enable efficient and rule-based appointment planning.",
      "Improved the scheduling algorithm by troubleshooting appointment placement issues and automating the transfer of generated appointments into the BMD calendar software, gaining practical experience in API integration, software testing, and algorithm development.",
      "Developed the backend using Java and Spring Boot and built the frontend with HTML, CSS, and JavaScript.",
    ],
  },
];
