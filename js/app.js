import { ensureState, updateState, clearState } from "./state.js";

const PAGE = document.documentElement.dataset.page || "unknown";

// Minimal routing guard: enforce the sequence.
const FLOW = [
  "index",
  "consent",
  "tech-check",
  "instructions",
  "practice",
  "iat",
  "self-report",
  "results",
  "submit",
  "thank-you"
];

function idxOf(page) {
  return FLOW.indexOf(page);
}

function setProgress(page) {
  updateState(s => {
    s.progress.page = page;
    s.progress.step = Math.max(s.progress.step, idxOf(page));
    return s;
  });
}

function requireAtLeast(page) {
  const s = ensureState();
  const needed = idxOf(page);
  const have = s.progress.step;
  // allow index always
  if (page === "index") return;
  if (have < needed - 1) {
    // not yet reached the prerequisite
    window.location.href = "index.html";
  }
}

function wireReset() {
  const btn = document.querySelector("[data-action='reset']");
  if (!btn) return;
  btn.addEventListener("click", () => {
    clearState();
    window.location.href = "index.html";
  });
}

function showSessionId() {
  const el = document.querySelector("[data-session-id]");
  if (!el) return;
  const s = ensureState();
  el.textContent = s.sessionId;
}

function showProgress() {
  const el = document.querySelector("[data-progress]");
  if (!el) return;
  const s = ensureState();
  const step = Math.min(s.progress.step, FLOW.length-1);
  el.textContent = `step ${step}/${FLOW.length-1} • ${s.progress.page}`;
}

// Consent enforcement: you can't proceed past consent without consented=true.
function consentGuard() {
  const s = ensureState();
  if (idxOf(PAGE) > idxOf("consent") && !s.consented) {
    window.location.href = "consent.html";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ensureState();
  wireReset();
  showSessionId();
  showProgress();

  // record progress
  if (FLOW.includes(PAGE)) setProgress(PAGE);

  // basic guards
  requireAtLeast(PAGE);
  consentGuard();
});
