import { loadState, updateState } from "./state.js";

// TODO: Replace with your actual endpoint once Google Cloud is ready
// Example: https://YOUR-CLOUD-RUN-URL/api/submit
const ENDPOINT = ""; // leave blank for now

function payloadFromState(s) {
  return {
    version: s.version,
    sessionId: s.sessionId,
    createdAt: s.createdAt,
    consented: s.consented,
    tech: s.tech,
    iat: {
      summary: s.iat.summary,
      // In production you may send trial-level data too, depending on IRB + analysis needs
      trials: s.iat.trials
    },
    selfReport: s.selfReport
  };
}

function setUi(el, msg, kind="notice") {
  el.innerHTML = `<div class="notice ${kind}">${msg}</div>`;
}

async function submitData() {
  const s = loadState();
  const out = document.querySelector("#submitOutput");
  if (!out) return;

  if (!s?.consented) {
    setUi(out, "Consent not recorded. Please return to the consent page.", "danger");
    return;
  }

  const data = payloadFromState(s);

  // If endpoint not set, store locally and show "ready" state.
  if (!ENDPOINT) {
    updateState(st => {
      st.submit.status = "not_configured";
      st.submit.error = "No endpoint configured";
      return st;
    });
    setUi(out,
      `Submission endpoint is not configured yet.<br>
       Your anonymous session code is <strong><span class="kbd">${s.sessionId}</span></strong>.<br>
       Data is currently stored only in this browser.`,
      "warn"
    );
    return;
  }

  setUi(out, "Submitting…", "warn");

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json().catch(()=> ({}));

    updateState(st => {
      st.submit.status = "submitted";
      st.submit.submittedAt = new Date().toISOString();
      st.submit.serverReceiptId = json.receiptId || null;
      st.submit.error = null;
      return st;
    });

    setUi(out, `Submitted successfully.${json.receiptId ? `<br>Receipt: <code class="inline">${json.receiptId}</code>` : ""}`, "ok");
    const next = document.querySelector("#toThankYou");
    if (next) next.style.display = "inline-flex";
  } catch (e) {
    updateState(st => {
      st.submit.status = "failed";
      st.submit.error = String(e?.message || e);
      return st;
    });
    setUi(out, `Submission failed: <code class="inline">${String(e?.message || e)}</code><br>
      Your anonymous session code: <strong><span class="kbd">${s.sessionId}</span></strong>`, "danger");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("#submitBtn");
  if (btn) btn.addEventListener("click", submitData);
});
import { loadState, updateState } from "./state.js";

// TODO: Replace with your actual endpoint once Google Cloud is ready
// Example: https://YOUR-CLOUD-RUN-URL/api/submit
const ENDPOINT = ""; // leave blank for now

function payloadFromState(s) {
  return {
    version: s.version,
    sessionId: s.sessionId,
    createdAt: s.createdAt,
    consented: s.consented,
    tech: s.tech,
    iat: {
      summary: s.iat.summary,
      // In production you may send trial-level data too, depending on IRB + analysis needs
      trials: s.iat.trials
    },
    selfReport: s.selfReport
  };
}

function setUi(el, msg, kind="notice") {
  el.innerHTML = `<div class="notice ${kind}">${msg}</div>`;
}

async function submitData() {
  const s = loadState();
  const out = document.querySelector("#submitOutput");
  if (!out) return;

  if (!s?.consented) {
    setUi(out, "Consent not recorded. Please return to the consent page.", "danger");
    return;
  }

  const data = payloadFromState(s);

  // If endpoint not set, store locally and show "ready" state.
  if (!ENDPOINT) {
    updateState(st => {
      st.submit.status = "not_configured";
      st.submit.error = "No endpoint configured";
      return st;
    });
    setUi(out,
      `Submission endpoint is not configured yet.<br>
       Your anonymous session code is <strong><span class="kbd">${s.sessionId}</span></strong>.<br>
       Data is currently stored only in this browser.`,
      "warn"
    );
    return;
  }

  setUi(out, "Submitting…", "warn");

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json().catch(()=> ({}));

    updateState(st => {
      st.submit.status = "submitted";
      st.submit.submittedAt = new Date().toISOString();
      st.submit.serverReceiptId = json.receiptId || null;
      st.submit.error = null;
      return st;
    });

    setUi(out, `Submitted successfully.${json.receiptId ? `<br>Receipt: <code class="inline">${json.receiptId}</code>` : ""}`, "ok");
    const next = document.querySelector("#toThankYou");
    if (next) next.style.display = "inline-flex";
  } catch (e) {
    updateState(st => {
      st.submit.status = "failed";
      st.submit.error = String(e?.message || e);
      return st;
    });
    setUi(out, `Submission failed: <code class="inline">${String(e?.message || e)}</code><br>
      Your anonymous session code: <strong><span class="kbd">${s.sessionId}</span></strong>`, "danger");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("#submitBtn");
  if (btn) btn.addEventListener("click", submitData);
});
