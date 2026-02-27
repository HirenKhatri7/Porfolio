import {
  profile,
  socials,
  skills,
  projects,
  education,
  about,
} from "../data/portfolio";

export interface OutputLine {
  text: string;
  isHTML: boolean;
}

export interface CommandResult {
  output: OutputLine[];
}

// Helper to create plain text lines quickly
const plain = (text: string): OutputLine => ({ text, isHTML: false });

export const COMMANDS = [
  "help", "about", "skills", "projects", "experience",
  "education", "contact", "socials",
  "clear", "history", "whoami", "date", "echo", "banner",
  "neofetch", "sudo", "ls", "cat", "cd", "pwd", "exit",
];

export const BANNER: OutputLine[] = [
  plain(""),
  plain(" ██╗  ██╗██╗██████╗ ███████╗███╗   ██╗   ██╗  ██╗██╗  ██╗ █████╗ ████████╗██████╗ ██╗"),
  plain(" ██║  ██║██║██╔══██╗██╔════╝████╗  ██║   ██║ ██╔╝██║  ██║██╔══██╗╚══██╔══╝██╔══██╗██║"),
  plain(" ███████║██║██████╔╝█████╗  ██╔██╗ ██║   █████╔╝ ███████║███████║   ██║   ██████╔╝██║"),
  plain(" ██╔══██║██║██╔══██╗██╔══╝  ██║╚██╗██║   ██╔═██╗ ██╔══██║██╔══██║   ██║   ██╔══██╗██║"),
  plain(" ██║  ██║██║██║  ██║███████╗██║ ╚████║   ██║  ██╗██║  ██║██║  ██║   ██║   ██║  ██║██║"),
  plain(" ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝"),
  plain(""),
  plain(` ${profile.role} | React | Node.js | Spring Boot`),
  plain(" ──────────────────────────────────────────────────────"),
  plain(" Welcome to my interactive terminal portfolio!"),
  plain(" Type 'help' to see available commands."),
  plain(" ──────────────────────────────────────────────────────"),
  plain(""),
];

export const BANNER_MOBILE: OutputLine[] = [
  plain(""),
  plain("██╗  ██╗██╗██████╗ ███████╗███╗   ██╗"),
  plain("██║  ██║██║██╔══██╗██╔════╝████╗  ██║"),
  plain("███████║██║██████╔╝█████╗  ██╔██╗ ██║"),
  plain("██╔══██║██║██╔══██╗██╔══╝  ██║╚██╗██║"),
  plain("██║  ██║██║██║  ██║███████╗██║ ╚████║"),
  plain(""),
  plain("██╗  ██╗██╗  ██╗ █████╗ ████████╗██████╗ ██╗"),
  plain("██║ ██╔╝██║  ██║██╔══██╗╚══██╔══╝██╔══██╗██║"),
  plain("█████╔╝ ███████║███████║   ██║   ██████╔╝██║"),
  plain("██╔═██╗ ██╔══██║██╔══██║   ██║   ██╔══██╗██║"),
  plain("██║  ██╗██║  ██║██║  ██║   ██║   ██║  ██║██║"),
  plain(""),
  plain(`${profile.role}`),
  plain("React | Node.js | Spring Boot"),
  plain("─────────────────────────────"),
  plain("Welcome to my terminal portfolio!"),
  plain("Type 'help' for commands."),
  plain("─────────────────────────────"),
  plain(""),
];

export function executeCommand(raw: string): CommandResult {
  const parts = raw.trim().split(" ");
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1).join(" ");

  switch (cmd) {
    case "help":
      return {
        output: [
          plain("Available Commands"),
          plain("────────────────────────────────"),
          plain("about          - Who am I"),
          plain("skills         - My tech stack"),
          plain("projects       - Things I've built"),
          plain("education      - Education background"),
          plain("contact        - How to reach me"),
          plain("socials        - Social media links"),
          plain("whoami         - Current user"),
          plain("date           - Current date & time"),
          plain("echo <text>    - Print text"),
          plain("clear          - Clear terminal"),
        ],
      };

    case "about":
      return {
        output: [
          plain(profile.name),
          plain("──────────────────"),
          ...about.map((line) => plain(line)),
        ],
      };

    case "skills":
      return {
        output: [
          plain("Languages:   " + skills.languages.join(", ")),
          plain("Frameworks:  " + skills.frameworks.join(", ")),
          plain("Tools:       " + skills.tools.join(", ")),
          plain("Databases:   " + skills.databases.join(", ")),
        ],
      };

    case "projects":
      return {
        output: [
          ...projects.flatMap((p, i) => [
            plain(`${i + 1}. ${p.name}`),
            plain(`${p.description}`),
            plain(`Tech: ${p.tech.join(", ")}`),
            { text: `<a href="${p.url}" target="_blank" class="text-blue-400 underline">${p.url}</a>`, isHTML: true },
            plain(""),
          ]),
        ],
      };

    case "experience":
      return {
        output: [
          plain("I'm a fresh graduate actively looking for opportunities!"),
          plain("Open to full-time roles, internships, and freelance work."),
          plain(""),
          plain("If you'd like to work together, type 'contact' to reach me."),
        ],
      };

    case "education":
      return {
        output: [
          ...education.flatMap((e) => [
            plain(e.degree),
            plain(`${e.institution} (${e.year})`),
          ]),
        ],
      };


    case "contact":
      return {
        output: [
          plain(`Name:     ${profile.name}`),
          plain(`Email:    ${profile.email}`),
          plain(`Location: ${profile.location}`),
        ],
      };

    case "socials":
      return {
        output: [
          ...Object.values(socials).map((s) => ({
            text: `${s.label}: <a href="${s.url}" target="_blank" class="text-blue-400 underline">${s.handle}</a>`,
            isHTML: true,
          })),
        ],
      };


    case "whoami":
      return { output: [plain("visitor")] };

    case "date":
      return { output: [plain(new Date().toString())] };

    case "echo":
      return { output: [plain(args || "")] };

    case "banner":
      return { output: BANNER };

    case "neofetch":
      return {
        output: [
          plain(`${profile.name}@portfolio`),
          plain("─────────────────────"),
          plain(`Role:      ${profile.role}`),
          plain(`Location:  ${profile.location}`),
          plain(`Languages: ${skills.languages.slice(0, 4).join(", ")}`),
          plain(`Frameworks:${skills.frameworks.slice(0, 3).join(", ")}`),
          plain(`Tools:     ${skills.tools.slice(0, 3).join(", ")}`),
          plain(`Shell:     terminal-portfolio v1.0.0`),
          plain(`Uptime:    since ${new Date().getFullYear()}`),
        ],
      };

    case "sudo":
      return { output: [plain("Nice try! But you don't have root access here 😄")] };

    case "ls":
      return { output: [plain("about.txt  projects/  skills.txt  resume.pdf  socials.txt")] };

    case "cat":
      if (!args) return { output: [plain("Usage: cat <filename>")] };
      return { output: [plain(`Try the command directly: ${args.replace(".txt", "").replace(".pdf", "")}`)] };

    case "cd":
      return { output: [plain("There's nowhere else to go!")] };

    case "pwd":
      return { output: [plain("/home/visitor/portfolio")] };

    case "exit":
      return { output: [plain("You can check out anytime, but you can never leave 🎸")] };

    case "clear":
      return { output: [] };

    default:
      return {
        output: [plain(`Command not found: ${raw.trim()}. Type "help" for available commands.`)],
      };
  }
}
