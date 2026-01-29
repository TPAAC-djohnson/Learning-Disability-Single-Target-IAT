# Learning Disability Implicit Association Test (LD-IAT)

This repository hosts a browser-based Implicit Association Test (IAT) focused on learning disabilities, built using **MinnoJS** and designed for deployment via **Qualtrics** or other survey platforms that support external JavaScript.

## Overview
The LD-IAT measures implicit associations related to learning disabilities by pairing:
- Target categories (Learning Disabilities vs. No Learning Disabilities)
- Attribute categories (Positive vs. Negative)

The task is implemented using Project Implicit’s `iat10.js` extension.

## Files
- `learning_disability_single_iat.js`  
  The main MinnoJS task definition file. This is the file loaded by Qualtrics or any HTML container.

## How It Is Used
This repository does **not** require an `index.html` file when used with Qualtrics.

Typical flow:
1. Participant enters a Qualtrics survey
2. Qualtrics loads `learning_disability_single_iat.js`
3. The IAT runs client-side in the browser
4. Raw trial data are written back into a Qualtrics multiline text-entry field

## Requirements
- Desktop or laptop browser recommended
- JavaScript enabled
- HTTPS hosting (GitHub Pages, CDN, or institutional server)

## Citation
MinnoJS:
Zlotnick, E., Dzikiewicz, A. J., & Bar-Anan, Y. (2015). Minno.js (Version 0.3) [Computer software].

Qualtrics + Minno integration:
Bengayev, E. (2020). Running Project Implicit’s ST-IAT from Qualtrics.

## Notes
- This repository is intended for research, pilot studies, and educational use.
- No Qualtrics support is provided for MinnoJS scripts.
- Researchers are responsible for IRB compliance and ethical review.

---

