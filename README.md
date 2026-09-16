# SideCam Kuwait

SideCam Kuwait is a futsal clip marketplace for Kuwait.

## Files

- `index.html` — website structure
- `styles.css` — complete visual design
- `script.js` — Appwrite connection and live match/clip loading
- `README.md` — project notes

## Backend

Appwrite:
- Project: `6aa9c83f001baf62e817`
- Endpoint: `https://fra.cloud.appwrite.io/v1`
- Database: `6aa9c8c0001edf97de19`

Tables:
- Matches: `6aa9c8df0036872a58d8`
- Clips: `6aa9c9320030cabeb298`
- Players: `6aaa0c3c00110ecd2a07`

Cloudflare Stream is used for video hosting. Signed playback will be connected through the backend before launch.

## Deploy

Upload/replace all four files in the GitHub repository root and commit.
Appwrite Sites should automatically deploy from the `main` branch.
