// GoalFinder: the open-source assistive device I took over at HTL Leonding.
// Sources: goalfinder.github.io, its documentation and
// github.com/htl-leo-club-embedded-iot/GoalFinder

export type Milestone = {
  when: string;
  title: string;
  place: string;
  text: string;
  link?: { label: string; href: string };
};

export type WorkArea = {
  title: string;
  bullets: string[];
};

export type StackGroup = {
  label: string;
  items: string[];
};

export const goalfinder = {
  range: "2025 – present",
  role: "Team · Assistive Tech",
  lead: "GoalFinder is an open-source device that mounts on a basketball hoop and helps blind and visually impaired players play more independently. It plays a sound so players can find the basket, and gives sound and light feedback on every hit and miss.",
  how: [
    "A shake sensor picks up the ball hitting the rim or backboard. A time-of-flight distance sensor registers the ball dropping through the hoop. The ESP32 then plays a hit or miss sound through an I²S amplifier and drives an LED strip for visual feedback.",
    "The device opens its own Wi-Fi network with a captive portal. Connecting to it opens a web panel, served straight from the device's flash, where coaches can run game modes, track players' scores and change every setting.",
  ],
  takeover:
    "The original team built GoalFinder and won awards with it. At the end of 2025 Florian Hetzmann and I took it over through HTL Leonding's Embedded Systems club. Our goal was to take it from a working prototype to something a school can use every day.",
  work: [
    {
      title: "Firmware",
      bullets: [
        "Reworked hit detection: replaced a slow, inaccurate ISR with a dedicated reading routine, changed the SW420 driver to report state changes with adjustable sensitivity, fixed missed VL53L0X readings and added basic sunlight protection.",
        "Added detection presets, LED feedback modes with event animations, and audio buffering so playback starts cleanly.",
        "Built out the networking: an onboard DNS server so goalfinder.local resolves, a restructured Wi-Fi setup with external network support, client authentication and encryption of sensitive settings with fresh keys generated for each build.",
      ],
    },
    {
      title: "Web panel",
      bullets: [
        "Added Free Play and the game session logic behind the timed challenges, game presets and a spectating panel.",
        "Redesigned the game selection, settings and About pages, added accent colours, an icon-based header and a first-run setup.",
        "Reduced how much loading the web app interferes with audio playback on the device, and fixed several security issues.",
      ],
    },
    {
      title: "Project",
      bullets: [
        "Wrote the user documentation and build guide, published with MarkDown Doc in English and German.",
        "Set up the release workflow, versioning scripts, issue and PR templates, and the contribution and security policies.",
      ],
    },
  ] satisfies WorkArea[],
  milestones: [
    {
      when: "Winter 2025 / 26",
      title: "In real use",
      place: "Landesschulzentrum für Hör- und Sehbildung, Linz",
      text: "We gave two GoalFinder devices to the school and mounted one on a mini basketball hoop on site, where the children tried it out right away.",
      link: {
        label: "HTL Leonding article",
        href: "https://archiv.htl-leonding.at/2026/02/24/erster-goalfinder-im-echtbetrieb/",
      },
    },
    {
      when: "24 April 2026",
      title: "Lange Nacht der Forschung",
      place: "University of Vienna · Main building",
      text: "Austria's Long Night of Research drew about 4,700 visitors to the University of Vienna's main building. GoalFinder was part of the stand on including people with visual impairments, next to the camera-based exercise coach Sportsfreund and the Digitaler Klingelball.",
      link: {
        label: "Event recap",
        href: "https://www.sinnvollaktiv.at/veranstaltungen/lange-nacht-der-forschung-2026/",
      },
    },
    {
      when: "26 June 2026",
      title: "sinnvoll aktiv",
      place: "University of Vienna · Institute of Sport and Exercise Science",
      text: "sinnvoll aktiv is a Sparkling Science project that builds assistive systems to keep older people with visual impairments or blindness physically active. It brings the University of Vienna together with HTL Leonding, HTL Donaustadt, HTL Rennweg and associations for the blind. GoalFinder grew out of its predecessor project, Smart Sport Assistance.",
      link: {
        label: "Event recap",
        href: "https://www.sinnvollaktiv.at/veranstaltungen/vorhang-auf-prawesentation-der-assistenzsysteme/",
      },
    },
  ] satisfies Milestone[],
  stack: [
    {
      label: "Hardware",
      items: ["ESP32 (D1 Mini32)", "VL53L0X ToF", "SW420", "MAX98357A I²S", "LED strip"],
    },
    {
      label: "Firmware",
      items: ["C++", "Arduino", "PlatformIO", "LittleFS", "WebSockets", "ESP8266Audio"],
    },
    {
      label: "Web panel",
      items: ["Vue", "TypeScript", "Vite", "Pinia", "Vue Router"],
    },
    {
      label: "Tooling",
      items: ["GitHub Actions", "KiCad"],
    },
  ] satisfies StackGroup[],
  links: {
    site: "https://goalfinder.github.io/",
    repo: "https://github.com/htl-leo-club-embedded-iot/GoalFinder",
    docs: "https://goalfinder.github.io/documentation",
  },
};
