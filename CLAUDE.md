# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Chrome extension (Manifest V3) called "New Reddit Auto Dark Mode" that automatically syncs Reddit's theme with the user's system dark/light mode preference.

## Development

**Loading the extension for testing:**
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked" and select this repository folder
4. Navigate to reddit.com to test

**After making changes:**
- Click the refresh icon on the extension card in `chrome://extensions/` to reload

## Architecture

This is a minimal content script extension with no background service worker or popup UI.

- `manifest.json` - Extension configuration (Manifest V3), injects content script on reddit.com
- `content.js` - Content script that runs on every Reddit page. Detects system color scheme via `matchMedia` and toggles Reddit's theme classes (`theme-dark`/`theme-light`) on the document element. Also syncs Reddit's built-in darkmode toggle button state.
