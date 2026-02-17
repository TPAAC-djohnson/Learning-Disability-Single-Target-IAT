// Central state management for session + data.
// Uses localStorage so GitHub Pages can run fully client-side.

const STORAGE_KEY = "ld_stiat_v1";

export function nowIso() {
  return new Date().toISOString();
}

export function makeId(prefix="S") {
  // short-ish random id (not cryptographic)
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}

export function ensureState() {
  let s = loadState();
  if (!s) {
    s = {
      version: "1.0",
      sessionId: makeId("LD"),
      createdAt: nowIso(),
      consented: false,
      progress: { page: "index", step: 0 },
      tech: {},
      iat: { trials: [], summary: null },
      selfReport: {},
      results: {},
      submit: { status: "not_submitted", submittedAt: null, serverReceiptId: null, error: null }
    };
    saveState(s);
  }
  return s;
}

export function updateState(patchFn) {
  const s = ensureState();
  const updated = patchFn(structuredClone(s)) || s;
  saveState(updated);
  return updated;
}
