import { updateState } from "./state.js";

function detect() {
  const ua = navigator.userAgent || "";
  const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);
  const width = window.innerWidth;
  const height = window.innerHeight;

  return {
    userAgent: ua,
    isMobile,
    viewport: { width, height },
    hasKeyboard: !isMobile, // heuristic; you can refine if needed
    timestamp: new Date().toISOString()
  };
}

function render(info) {
  const box = document.querySelector("#techResults");
  if (!box) return;

  const issues = [];
  if (info.viewport.width < 700) issues.push("Small screen detected. Desktop/laptop is recommended for reaction-time tasks.");
  if (!info.hasKeyboard) issues.push("Keyboard not detected (or device appears mobile). The task works best with physical keys.");

  box.innerHTML = `
    <div class="notice ${issues.length ? "warn" : "ok"}">
      <div><strong>Device check:</strong> ${issues.length ? "Some limitations detected." : "Looks good."}</div>
      ${issues.length ? `<ul>${issues.map(i=>`<li>${i}</li>`).join("")}</ul>` : ""}
      <div class="small">Viewport: ${info.viewport.width}×${info.viewport.height}</div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const info = detect();
  updateState(s => { s.tech = info; return s; });
  render(info);
});
