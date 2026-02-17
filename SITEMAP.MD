Site map (front-end on GitHub Pages)

1) / — Landing (Featured Task)

Title + one-paragraph purpose

“Data Privacy” short block (HTTPS, anonymous, no PII)

Disclaimer about interpretations

Primary button: Proceed

Footer links: Privacy, Contact, Accessibility

2) /consent — Consent / Acknowledgement

Short consent language (anonymous, voluntary, can stop anytime)

Checkbox: “I understand…”

Button disabled until checked: I agree, begin

Secondary: I do not agree → /exit

3) /tech-check — Device + input readiness

Detect: mobile vs desktop, screen width, keyboard present

Explain: needs keyboard keys (E/I) or on-screen buttons for mobile

Button: Continue

Optional: “Practice mode” toggle

4) /instructions — How the task works

Super plain: sorting, speed + accuracy, keys used

Example of left/right category labels

Button: Start practice

5) /practice — Practice blocks

1–2 short blocks to train key mapping

Feedback: “Correct / Incorrect” (brief)

If accuracy too low, offer repeat practice

Button: Begin test

6) /iat — Main IAT task

Block structure (typical):

Block A: single-target practice

Block B: combined practice

Block C: combined test

Block D: reversed pairing practice

Block E: reversed pairing test

Collect RTs, errors, trial count, block order, timestamps

No extra imagery, no decorative UI

7) /self-report — Brief questionnaire

3–6 items max (Likert scales)

Example items (neutral wording):

“My explicit attitude toward learning disability is…”

“I have personal experience with learning disability…” (yes/no/prefer not)

Still no demographics unless IRB requires

8) /results — Participant feedback

Provide a careful “interpretation range,” not a verdict

Include: “This is not a diagnosis.”

Option: download/print personal copy (client-side only)

9) /submit — Data transmission confirmation

Behind the scenes: POST data to Google Cloud endpoint

Display: “Submitting…” → success/fail state

On fail: give “Copy anonymous code” so data can be re-submitted

10) /thank-you — Completion

Thank you + debrief statement

Provide researcher contact + IRB contact info (if applicable)

11) /exit — Non-consent / early exit

“You chose not to participate.”

No data saved (or save only a non-identifying exit event if IRB allows)

Back-end (receive + store in Google Cloud)

A) HTTPS endpoint (serverless)

Google Cloud Functions or Cloud Run

Route: POST /api/submit

Accept JSON payload:

anonymous session id

block order

trial-level RT/error data (or summary + trial data depending on size)

self-report responses

metadata: browser, device type (non-identifying)

B) Storage

Firestore (fast, simple) or BigQuery (best for analysis later)

Keep raw + cleaned versions

Access locked to Dr. Robin + you (least privilege)

C) Security + compliance

HTTPS enforced

CORS restricted to your domain

No PII collected by design

Logging configured to avoid storing full IPs in app logs (or minimize retention)

Folder structure (what you’ll actually host)

index.html (landing)

consent.html

tech-check.html

instructions.html

practice.html

iat.html

self-report.html

results.html

thank-you.html

exit.html

/assets/ (CSS, minimal icons)

/js/ (task engine + scoring + submit client)
