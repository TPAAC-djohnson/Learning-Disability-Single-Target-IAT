# Learning Disability Single‑Target Implicit Association Test (ST‑IAT)

This repository implements a **browser‑based Single‑Target Implicit Association Test (ST‑IAT)** focused on the concept of **Learning Disability**.  It uses the [MinnoJS](https://github.com/baranan/minno-js) IAT extension to collect reaction‑time data for measuring implicit associations between the target concept and two attribute categories (Positive vs Negative).

## Folder structure

The project consists of three files:

| File | Description |
|-----|-------------|
| `index.html` | Entry point.  Loads the MinnoJS runtime and starts the ST‑IAT. |
| `learning_disability_single_iat.js` | AMD module defining the ST‑IAT logic, stimuli and styling.  At the end of the test a JSON download link appears with the participant’s data. |
| `README.md` | This documentation explaining how to deploy and run the task. |

## Running locally

Because modern browsers restrict certain APIs when opening files directly from disk, it’s best to serve the files through a local web server:

1. Clone or download this repository to your computer.
2. From the project folder, start a simple web server (for example using Python):

   ```bash
   python3 -m http.server
