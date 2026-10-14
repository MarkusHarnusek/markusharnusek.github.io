export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

export type Profile = {
  name: string;
  pronouns: string;
  location: string;
  role: string;
  bio: string;
  currently: { label: string; value: string }[];
  email: string;
  socials: SocialLink[];
};

export const profile: Profile = {
  name: "Markus Harnúšek",
  pronouns: "he/him",
  location: "Leonding, Österreich",
  role: "Software Engineering Student",
  bio: `How did I get here?\n
        At seven, I came along with my parents to the Microsoft Global Azure Bootcamp in Linz. I ended up in a kids' programming workshop, getting my first experience with Scratch and discovering what would become my biggest passion.\n 
        For me Scratch quickly became about more than just making games. Before long, I was building mock operating systems to see what I could create. 
        Eventually, I got my first taste of embedded development when I programmed my first traffic light sequence with a cute breadboard and some LEDs.\n
        By age ten, I had started visiting CoderDojo in Linz, where I learned TypeScript with p5.js and got my first experience with real electronics projects. With every visit, I discovered a little more of what I wanted to do with my future.\n
        When it came to choosing my next step after middle school, I knew I wanted to continue down this path. HTL Leonding was the obvious choice.\n
        Over the past three years, I've had the opportunity to get some real hands-on experience, work on some exciting projects, and collaborate with some genuinely great people.\n
        In my second year, I found myself drawn to embedded systems. I started programming microcontrollers, beginning with Arduinos before moving on to proper ESP32s. Along learning journey I've acquired many new skills from 3D printing and soldering to laser cutting. I wasn't just writing code anymore; I was learning how to bring ideas into the physical world.\n
        Now, in my third year, I've taken another step forward by becoming president of HTL Leonding's Embedded Systems Club. I'm excited to help others discover the same passion for embedded development and bring people together around new exciting projects.`,
  currently: [
    { label: "Studying", value: "3rd Grade Software Engineering at HTL Leonding" },
    { label: "Working on", value: "GoalFinder and projects around the Embedded Systems Club" },
    { label: "Exploring", value: "Voice recognition on embedded systems" },
  ],
  email: "m.harnusek@students.htl-leonding.ac.at",
  socials: [
    { label: "GitHub", href: "https://github.com/markusharnusek", handle: "@markusharnusek" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/markus-harn%C3%BA%C5%A1ek-807b363b3/", handle: "@markus-harnúšek" }
  ],
};
