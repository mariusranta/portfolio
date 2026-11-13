export function createTerminal(transcript, promptText) {
    function addLine(text, className) {
      const line = document.createElement("div");
      line.className = "line" + (className ? " " + className : "");
      if (text === "") line.classList.add("blank");
      line.textContent = text;
      transcript.appendChild(line);
      transcript.scrollTop = transcript.scrollHeight;
      return line;
    }

    function addExperienceTimeline(entries) {
      const timeline = document.createElement("div");
      timeline.className = "line timeline";
      timeline.setAttribute("role", "list");

      entries.forEach(function (entry) {
        const item = document.createElement("div");
        item.className = "timeline-entry";
        item.setAttribute("role", "listitem");

        const date = document.createElement("div");
        date.className = "timeline-date";
        date.textContent = entry.date;

        const content = document.createElement("div");
        content.className = "timeline-content";

        const role = document.createElement("span");
        role.className = "timeline-role";
        role.textContent = entry.role;

        const organization = document.createElement("span");
        organization.className = "timeline-organization";
        organization.textContent = entry.organization;

        const description = document.createElement("div");
        description.className = "timeline-description";
        description.textContent = entry.description;

        content.append(role, organization, description);
        item.append(date, content);
        timeline.appendChild(item);
      });

      transcript.appendChild(timeline);
      transcript.scrollTop = transcript.scrollHeight;
    }

    function addCommand(command) {
      const line = document.createElement("div");
      line.className = "line command-line";
      const prompt = document.createElement("span");
      prompt.className = "prompt";
      prompt.textContent = promptText;
      const text = document.createElement("span");
      text.className = "command-text";
      text.textContent = command;
      line.append(prompt, text);
      transcript.appendChild(line);
      transcript.scrollTop = transcript.scrollHeight;
    }

    function addLinkLine(label, url) {
      const line = document.createElement("div");
      line.className = "line";
      line.append(document.createTextNode(label + " "));
      const link = document.createElement("a");
      link.href = url;
      if (!url.startsWith("mailto:")) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      link.textContent = url.replace(/^mailto:/, "").replace(/^https?:\/\//, "");
      line.appendChild(link);
      transcript.appendChild(line);
      transcript.scrollTop = transcript.scrollHeight;
    }

    function welcome() {
      addLine("Vunderbaum OS [Version 66.500000.25.720000]", "banner");
      addLine("(c) " + new Date().getFullYear() + " Marius Ranta. All rights reserved.", "banner");
      addLine("");
      addLine("Type help to explore. Use ↑ and ↓ for command history.", "hint");
    }

  return { addLine, addExperienceTimeline, addCommand, addLinkLine, welcome, clear: function () { transcript.replaceChildren(); } };
}
