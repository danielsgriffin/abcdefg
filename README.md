# abcdefg (or Auto-Button-Click Double-check Evaluation for Funsies or Gnoses)

This script automatically clicks the first Double-check response button if one appears within one minute of loading a Gemini webpage. It does not currently support switching between conversations, or threaded conversations.

This is with extractFactChecks set to true.
<img width="835" alt="image" src="https://github.com/danielsgriffin/abcdefg/assets/6070690/2e2e5b39-a3f0-49fa-923c-cacf4bd0caa4">


See the preamble:

```
// ==UserScript==
// @name         Auto-Button-Click Double-check Evaluation for Funsies or Gnoses
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Clicks "fact-check-button" whenever it appears unless "factuality-status" is present.
// @author       danielsgriffin
// @match        https://gemini.google.com/app/*
// @grant        none
// @run-at       document-end
// ==/UserScript==
```

## Setup

1. Install Tampermonkey or a similar browser extension. 
2. Open the raw abcdefg.user.js file https://github.com/danielsgriffin/abcdefg/raw/main/abcdefg.user.js
3. Tampermonkey will offer to load the userscript.

Then it will run on its own when using Gemini. Tell me if you have any questions/comments!
