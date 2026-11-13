export function runCommand(commandText, terminal) {
    const raw = commandText.trim();
    if (!raw) return;
    terminal.addCommand(raw);
    const firstSpace = raw.search(/\s/);
    const command = (firstSpace < 0 ? raw : raw.slice(0, firstSpace)).toLowerCase();
    const argument = firstSpace < 0 ? "" : raw.slice(firstSpace).trim();

    switch (command) {
      case "help":
        terminal.addLine("Available commands:");
        terminal.addLine("  help         Show this list");
        terminal.addLine("  about        About Marius");
        terminal.addLine("  projects     Selected work");
        terminal.addLine("  experience   Education and experience");
        terminal.addLine("  contact      How to get in touch");
        terminal.addLine("  whoami       Show the current user");
        terminal.addLine("  date         Show the local date and time");
        terminal.addLine("  echo <text>  Print text to the console");
        terminal.addLine("  clear, cls   Clear the console");
        terminal.addLine("");
        terminal.addLine("Tip: commands are not case-sensitive.", "hint");
        break;
      case "gf":
      case "girlfriend":
        terminal.addLine("Heta<3");
        break;
      case "about":
        terminal.addLine("Marius Ranta");
        terminal.addLine("Computer science student at the University of Turku.");
        terminal.addLine("I enjoy designing, building, and solving problems with a team.");
        break;
      case "projects":
        terminal.addLine("Selected project:");
        terminal.addLine("  Command Prompt Portfolio — the interactive site you are viewing.");
        terminal.addLinkLine("  Source:", "https://github.com/mariusranta/portfolio");
        break;
      case "experience":
        terminal.addLine("Experience", "hint");
        terminal.addExperienceTimeline([
          {
            date: "Present",
            role: "Computer Science Student",
            organization: "University of Turku",
            description: "Currently studying computer science."
          }
        ]);
        break;
      case "contact":
        terminal.addLine("Contact:");
        terminal.addLinkLine("  LinkedIn:", "https://www.linkedin.com/in/marius-ranta/");
        terminal.addLinkLine("  Email:", "mailto:mariusranta@gmail.com");
        break;
      case "whoami":
        terminal.addLine("marius");
        break;
      case "date":
        terminal.addLine(new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(new Date()));
        break;
      case "echo":
        terminal.addLine(argument);
        break;
      case "clear":
      case "cls":
        terminal.clear();
        break;
      case "dir":
        terminal.addLine(" Directory of C:\\");
        terminal.addLine("");
        terminal.addLine("about.txt       About Marius");
        terminal.addLine("projects.txt    Selected work");
        terminal.addLine("experience.txt  Education and experience");
        terminal.addLine("contact.txt     Contact information");
        terminal.addLine("");
        terminal.addLine("  4 File(s)", "hint");
        break;
      case "ver":
        terminal.addLine("Vunderbaum OS [Version 66.500000.25.720000]", "banner");
        break;
      default:
        terminal.addLine("'" + raw + "' is not recognized as an internal or external command,", "error");
        terminal.addLine("operable program or batch file.", "error");
        terminal.addLine("Type help to see the available commands.", "hint");
    }
  }
