# 🔐 Google Sheets Secrets

A client-side, zero-knowledge encryption workflow for storing secrets in Google Sheets. Your plaintext never leaves your browser.

<a id="readme-top"></a>

<div align="center">
  <p style="font-size:4rem">🔐</p>
  <h1 style="font-size:2.5rem;margin:0.3em 0;">Google Sheets Secrets</h1>
  <p style="margin:0.5em 0 1em;">Client-side AES-256-GCM encryption - Google Servers never see your plaintext secrets.</p>
  <p><a href="#table-of-contents">Jump to table of contents</a> · <a href="#installation">Get started quickly</a></p>
</div>


## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [UI](#ui)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [Security Model](#security-model)
- [File Architecture](#file-architecture)
- [Compatibility \& Limitations](#compatibility--limitations)
- [FAQ](#faq)
- [Contributing](#contributing)
- [License](#license)
- [Source](#source)
- [Acknowledgments](#acknowledgments)


<a id="overview"></a>

## Overview

Google Sheets Secrets provides an end-to-end encrypted secret storage flow inside Google Sheets, with zero-knowledge cryptography executed in the browser. This means your secrets stay private, while you keep the convenience of Google Sheets.


<a id="features"></a>

## Features

- Enhanced security: Zero-knowledge cryptography (browser-only)
- Robust key derivation: AES-256-GCM with PBKDF2 (200k iterations)
- Real-time duplicate label detection
- Live password strength meter
- One-click copy
- Add Entry for any sheet


<a id="UI"></a>

## UI



<a id="quick-start"></a>

## Get started quickly

- Open any Google Sheet.
- Install the Apps Script:
    - Extensions → Apps Script
    - Replace Code.gs with the version from the repo
    - Add encryptDialog.html and decryptDialog.html
    - Save → Reload Sheet → Secrets menu appears
- Use:
    - Secrets → Add Entry to store a new secret
    - Click a row → Decrypt to reveal plaintext in-browser, then copy


<a id="usage"></a>

## Usage

- Secrets → Add Entry
- Label: e.g., "Stripe Secret Key"
- Secret: the sensitive value
- Password: master password for encryption
- Add Entry saves to the next available row
- Decrypt a row to reveal plaintext in the browser
- Copy plaintext securely and re-encrypt when needed


<a id="security-model"></a>

## Security Model

- Your browser handles plaintext → AES-256-GCM → ciphertext
- Google servers see ciphertext, salt, and IV only
- Decryption occurs entirely in the browser; plaintext is never stored remotely
- Each secret uses a unique salt and IV
- Duplicate labels trigger warnings
- Password strength validation helps prevent weak master passwords


<a id="file-architecture"></a>

## File Architecture

- Code.gs: Server-side glue (menu + storage)
- encryptDialog.html: UI for adding entries and encryption
- decryptDialog.html: UI for decrypting and copying


<a id="compatibility--limitations"></a>

## Compatibility \& Limitations

- Works on any Google Sheet; auto-detects the next available row
- Modern browsers required (Chrome/Firefox/Safari/Edge)
- If you forget the master password, decryption is not possible
- Client-side encryption means you must manage the master password securely


<a id="faq"></a>

## FAQ

- Q: Is this safe for business use?
  - A: It provides client-side encryption with zero exposure of plaintext to Google servers. Align with your organization’s security policies.
- Q: What happens if I lose the master password?
  - A: Decryption is impossible without it. Use a password manager to store it securely.
- Q: Can I use this on multiple sheets?
  - A: Yes! Any sheet can use the same workflow, with entries stored per sheet.
- Q: Why should anyone use this?
  - A: It adds browser-side encryption to your existing sheet workflow, so secrets stay private even when sharing a sheet.
- Q: Why use multiple master passwords?
  - A: Each secret is isolated by its own master password, so compromising one password doesn’t expose the others.

<a id="contributing"></a>

## Contributing

- Fork the repository and create feature branches
- Open a pull request with a clear description
- Follow project conventions and add tests/documentation as needed


<a id="license"></a>

## License

MIT - Free for personal and commercial use


<a id="source"></a>

## Source

https://github.com/wteuber/google-sheets-secrets


<a id="acknowledgments"></a>

## Acknowledgments

- Thanks to the open-source community for templates and best practices
- Credit to any libraries or inspirations used
