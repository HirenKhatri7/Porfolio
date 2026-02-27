// ─────────────────────────────────────────────
// All portfolio data in one place.
// Edit this file to update your portfolio content.
// ─────────────────────────────────────────────

export const profile = {
  name: "Hiren Khatri",
  role: "Full-Stack Developer",
  location: "India",
  email: "hirenkhatri83@gmail.com"
};

export const socials = {
  github: { label: "GitHub", url: "https://github.com/HirenKhatri7", handle: "@HirenKhatri7" },
  linkedin: { label: "LinkedIn", url: "www.linkedin.com/in/hiren-khatri-9a079a2a4", handle: "hirenkhatri" },
  medium: { label: "Medium", url: "https://medium.com/@hirenkhatri83", handle: "@hirenkhatri83" },
};

export const skills = {
  languages: ["Java", "Python", "C", "SQL", "Javascript"],
  frameworks: ["React",  "Node.js", "Express", "Angular", "Electron"],
  tools: ["Git", "VS Code",  "Postman"],
  databases: ["PostgreSQL", "MongoDB", "Redis", "MySQL"],
};

export const projects = [
  {
    name: "Coffee Ordering System Backend",
    description: "A backend system for managing coffee orders, menu items, and customer interactions",
    tech: ["Java", "Spring Boot", "REST API", "Kafka"],
    url: "https://github.com/HirenKhatri7/coffee-ordering-system-backend",
  },
  {
    name: "DevSync",
    description: "A real-time collaborative development environment for seamless team coding",
    tech: ["React", "Node.js", "WebSockets", "Redis"],
    url: "https://github.com/HirenKhatri7/DevSync",
  },
  {
    name: "Screen Time & Productivity Tracker",
    description: "Track screen time and manage productivity goals with insightful analytics",
    tech: ["Electron", "JavaScript", "Node.js", "SQLite"],
    url: "https://github.com/HirenKhatri7/Screen-Time-Productivity-Tracker-with-Goal-Management",
  },
];



export const education = [
  {
    degree: "B.Tech in Computer Science",
    institution: "Thadomal Shahani Engineering College",
    year: "2022-2026",
  },
];



export const about = [
  `Hi, I'm ${profile.name}!`,
  "",
  `I'm a ${profile.role} based in ${profile.location}.`,
  "I love building web applications",
  "and exploring new technologies.",
  "",
  "Type 'skills' to see my tech stack, or 'projects' to see my work.",
];
