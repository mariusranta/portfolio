const projectDocument = [
  { type: "heading", level: 2, text: "Selected Projects" },
  { type: "paragraph", text: "A selection of projects I have built and worked on." },
  { type: "heading", level: 3, text: "Command Prompt Portfolio" },
  { type: "paragraph", text: "An interactive personal website presented as a classic command prompt." },
  { type: "link", text: "View source on GitHub", href: "https://github.com/mariusranta/portfolio" }
];

export function renderProjectBlocks(container, blocks) {
  container.replaceChildren();
  for (const block of blocks) {
    let element;
    if (block.type === "heading") {
      element = document.createElement(block.level === 3 ? "h3" : "h2");
      element.textContent = block.text;
    } else if (block.type === "paragraph") {
      element = document.createElement("p");
      element.textContent = block.text;
    } else if (block.type === "link") {
      element = document.createElement("p");
      const link = document.createElement("a");
      link.href = block.href;
      link.textContent = block.text;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      element.append(link);
    } else if (block.type === "image") {
      element = document.createElement("figure");
      const image = document.createElement("img");
      image.className = "project-media";
      image.src = block.src;
      image.alt = block.alt || "";
      image.loading = "lazy";
      image.decoding = "async";
      element.append(image);
      if (block.caption) {
        const caption = document.createElement("figcaption");
        caption.className = "project-caption";
        caption.textContent = block.caption;
        element.append(caption);
      }
    } else if (block.type === "video") {
      element = document.createElement("figure");
      const video = document.createElement("video");
      video.className = "project-media project-video";
      video.controls = true;
      video.preload = "metadata";
      video.playsInline = true;
      if (block.poster) video.poster = block.poster;
      const source = document.createElement("source");
      source.src = block.src;
      if (block.mimeType) source.type = block.mimeType;
      video.append(source);
      element.append(video);
      if (block.caption) {
        const caption = document.createElement("figcaption");
        caption.className = "project-caption";
        caption.textContent = block.caption;
        element.append(caption);
      }
    }
    if (element) container.append(element);
  }
}

export function createProjectsWindow({ desktop, projectsWindow, projectsDocument }) {
  renderProjectBlocks(projectsDocument, projectDocument);
  const open = () => {
    projectsWindow.hidden = false;
    projectsWindow.classList.remove("is-minimized");
    desktop.classList.add("projects-open");
    projectsDocument.focus({ preventScroll: true });
  };
  document.getElementById("minimize-projects").addEventListener("click", () => {
    projectsWindow.classList.add("is-minimized");
  });
  document.getElementById("maximize-projects").addEventListener("click", () => {
    projectsWindow.classList.toggle("is-maximized");
  });
  document.getElementById("close-projects").addEventListener("click", () => {
    projectsWindow.hidden = true;
    projectsWindow.classList.remove("is-maximized", "is-minimized");
    desktop.classList.remove("projects-open");
  });
  return { open };
}
