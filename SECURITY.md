# Security Policy

“Data are encrypted in transit and stored in a restricted environment with access limited to authorized research personnel.”

## Overview

The Learning Disability Single-Target IAT (ST-IAT) is designed to protect participant data during transmission, storage, and analysis. This repository contains the public-facing study interface only. Data collection and storage occur in a restricted research environment.

## Data Transmission

All traffic between participants and the study website is encrypted using HTTPS (TLS). This protects responses from interception during transmission.

## Data Collection

The study may collect:

- Reaction times and task accuracy
- Block order and condition assignments
- Optional self-report responses (if included)
- Timestamps for research analysis

The study does **not** collect direct personal identifiers (e.g., names, email addresses) unless explicitly described in the informed consent.

## Data Storage

Participant data are stored in a restricted research environment separate from this GitHub repository.

Security controls include:

- Authenticated access
- Role-based permissions (least privilege)
- Encrypted storage where supported
- Audit logging where available

GitHub Pages is used only to serve static frontend files and does not store participant data.

## Data Retention

Data are retained according to Institutional Review Board (IRB) approval and institutional research policies. Data are deleted or archived securely following the approved retention schedule.

If found, please do not publicly disclose vulnerabilities before contacting the research team.

## Scope

This security policy applies to:

- The public study interface hosted via GitHub Pages
- Associated backend infrastructure used for secure data storage
- Research data handling practices related to this study
