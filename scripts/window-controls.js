export function bindWindowControls({ commandWindow, minimizeButton, maximizeButton, closeButton, reopenButton, input }) {
    minimizeButton.addEventListener("click", function () {
      const minimized = commandWindow.classList.toggle("is-minimized");
      minimizeButton.setAttribute("aria-label", minimized ? "Restore Command Prompt" : "Minimize Command Prompt");
      minimizeButton.title = minimized ? "Restore" : "Minimize";
    });

    maximizeButton.addEventListener("click", function () {
      if (commandWindow.classList.contains("is-minimized")) {
        commandWindow.classList.remove("is-minimized");
        minimizeButton.setAttribute("aria-label", "Minimize Command Prompt");
        minimizeButton.title = "Minimize";
      }
      const windowed = commandWindow.classList.toggle("is-windowed");
      maximizeButton.setAttribute("aria-label", windowed ? "Maximize Command Prompt" : "Restore Command Prompt");
      maximizeButton.title = windowed ? "Maximize" : "Restore";
    });

    closeButton.addEventListener("click", function () {
      commandWindow.hidden = true;
      reopenButton.hidden = false;
      reopenButton.focus();
    });

    reopenButton.addEventListener("click", function () {
      reopenButton.hidden = true;
      commandWindow.hidden = false;
      commandWindow.classList.remove("is-minimized", "is-windowed");
      minimizeButton.setAttribute("aria-label", "Minimize Command Prompt");
      minimizeButton.title = "Minimize";
      maximizeButton.setAttribute("aria-label", "Restore Command Prompt");
      maximizeButton.title = "Restore";
      input.focus();
    });
}
