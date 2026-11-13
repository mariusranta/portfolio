import { runCommand } from "./commands.js";
import { createTerminal } from "./terminal.js";
import { bindWindowControls } from "./window-controls.js";

const transcript = document.getElementById("transcript");
const form = document.getElementById("command-form");
const input = document.getElementById("command");
const commandWindow = document.getElementById("command-window");
const minimizeButton = document.getElementById("minimize-window");
const maximizeButton = document.getElementById("maximize-window");
const closeButton = document.getElementById("close-window");
const reopenButton = document.getElementById("reopen-window");
const homePath = "C:" + String.fromCharCode(92) + "Users" + String.fromCharCode(92) + "Marius";
const promptText = homePath + ">";
const terminal = createTerminal(transcript, promptText);
const history = [];
let historyIndex = 0;
let draft = "";

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const command = input.value;
  if (command.trim()) {
    history.push(command);
    historyIndex = history.length;
    draft = "";
    runCommand(command, terminal);
  }
  input.value = "";
  input.focus();
});

input.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp") {
    if (history.length === 0) return;
    event.preventDefault();
    if (historyIndex === history.length) draft = input.value;
    historyIndex = Math.max(0, historyIndex - 1);
    input.value = history[historyIndex];
    input.setSelectionRange(input.value.length, input.value.length);
  } else if (event.key === "ArrowDown") {
    if (history.length === 0) return;
    event.preventDefault();
    historyIndex = Math.min(history.length, historyIndex + 1);
    input.value = historyIndex === history.length ? draft : history[historyIndex];
    input.setSelectionRange(input.value.length, input.value.length);
  }
});

bindWindowControls({ commandWindow, minimizeButton, maximizeButton, closeButton, reopenButton, input });
terminal.welcome();
if (window.matchMedia("(pointer: fine)").matches) input.focus();
