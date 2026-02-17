import { updateState } from "./state.js";

// STUB: simulate collecting reaction-time trials.
// Replace with real IAT engine later.
function fakeTrials(n=40) {
  const trials = [];
  for (let i=0; i<n; i++) {
    const rt = Math.round(300 + Math.random()*900);
    const correct = Math.random() > 0.12;
    trials.push({
      i,
      block: i < n/2 ? "combined_A" : "combined_B",
      rt,
      correct,
      ts: new Date().toISOString()
    });
  }
  return trials;
}

function summarize(trials) {
  const rts = trials.filter(t=>t.correct).map(t=>t.rt);
  const mean = rts.reduce((a,b)=>a+b,0) / Math.max(1, rts.length);
  const errRate = 1 - (trials.filter(t=>t.correct).length / Math.max(1, trials.length));
  // placeholder “score”
  const score = Math.round((mean/1000) * 100) / 100;
  return { meanRtMs: Math.round(mean), errorRate: Math.round(errRate*1000)/1000, placeholderScore: score };
}

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.querySelector("#runIat");
  const status = document.querySelector("#iatStatus");

  if (!startBtn || !status) return;

  startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    status.textContent = "Running task… (stub)";

    setTimeout(() => {
      const trials = fakeTrials(80);
      const summary = summarize(trials);

      updateState(s => {
        s.iat.trials = trials;
        s.iat.summary = summary;
        return s;
      });

      status.textContent = "Task complete. Proceed to questionnaire.";
      const next = document.querySelector("#toSelfReport");
      if (next) next.style.display = "inline-flex";
    }, 800);
  });

  // Light “anti-back” for the task page (soft barrier, not bulletproof)
  history.pushState(null, "", location.href);
  window.addEventListener("popstate", () => {
    history.pushState(null, "", location.href);
  });
});
