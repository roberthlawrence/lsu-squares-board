# LSU Squares

A season-long football squares board for LSU home games. Static site (GitHub Pages) + its own Firebase project. Free at this scale. Forked from the 4th & Cold Squares board — same engine, its own database, purple & gold.

**What it does**

- Public 10×10 board, real-time — squares disappear the moment someone claims them
- Players sign in with name + email once; their squares follow them all season
- One tab per home game, each with its own drawn numbers
- Admin: lock/unlock board, animated live number draw (crypto-random), payment tracking, season config
- Live scores from ESPN on game day: score strip, pulsing "currently winning" square, winners recorded automatically as each quarter ends
- Pot tracker: squares sold, payouts, remainder to the tailgate fund
- Season archive/restore and a full audit log

---

## Setup (one time, ~15 minutes — all doable from a phone)

### 1. Create the Firebase project
1. Go to **console.firebase.google.com** → **Create a project** (e.g. `lsu-squares`). Google Analytics: **off**. Stay on the free **Spark** plan.
2. **Build → Firestore Database → Create database** → **Production mode** → location `nam5 (us-central)`.
3. **Build → Authentication → Get started** → **Sign-in method** tab → enable exactly these two:
   - **Anonymous** (players — invisible, no passwords)
   - **Google** (admins) — pick your email as the support email
4. **Authentication → Settings → Authorized domains → Add domain** → `YOUR-GITHUB-USERNAME.github.io`

### 2. Paste the security rules
**Firestore Database → Rules** tab → delete everything → paste the full contents of `firestore.rules` → **Publish**.

### 3. Connect the code to your project
1. Firebase console → ⚙️ **Project settings → General → Your apps → Web (`</>`)** → register an app (nickname anything, no Hosting).
2. Copy the six values it shows (`apiKey` … `appId`) into `firebase-config.js`.
   Until this file is filled in, the site shows **SETUP NEEDED** instead of loading — that's on purpose.

### 4. Publish on GitHub Pages
1. GitHub → **New repository** → name it in **all lowercase** (e.g. `lsu-squares`) → Public → Create.
   *GitHub Pages URLs are case-sensitive — lowercase avoids the classic "QR code 404s" problem.*
2. **Add file → Upload files** → drag in every file from this folder → **Commit**.
3. Repo **Settings → Pages** → Source: **Deploy from a branch** → `main` / `(root)` → **Save**.
4. In a minute or two it's live at `https://YOUR-GITHUB-USERNAME.github.io/lsu-squares/`

### 5. First-run season setup (do this right away)
1. Open the site → tap **Admin** → sign in with Google.
2. The season form appears. *Any* Google account can create the first config, so do this before sharing the link. Your email is auto-added as a power admin so you can't lock yourself out.
3. Fill in: season name, price per square, payout per win, admin emails, Venmo lines (one per line: `handle | who pays this person`), welcome blurb.
4. Set **Number of games**, tap **Fetch schedule from ESPN**, and use the dropdowns to pick the LSU home games you're running (skip any already played).
5. **Save season.** Share the link.

---

## Running a game week

1. **Before kickoff:** open the game's tab → Admin → **Draw numbers** (do it live at the tailgate — the digits spin on screen). **Lock numbers** when done.
2. **During the game:** the site polls ESPN every 60 seconds. Score strip up top; the square that would win the current quarter pulses blue. With a power admin's phone on the page, winners record themselves as each quarter ends.
3. **Backup:** Admin → **Pull scores & record winners** re-computes from ESPN any time (safe to re-run). Q4 pays on the end-of-regulation score — overtime doesn't count.
4. **Payments:** Admin → Payments lists everyone's square count automatically; enter what they Venmo'd and to whom. A row turns green when paid in full. Mark winner payouts paid in the same section.

## New season
Admin → Season setup → update price/payout/games → **Clear all squares** (it downloads a full archive first) → share the same link.

---

## Notes

- **Renaming or re-teaming the board:** edit `brand.js` — name, cheer, and the ESPN team ID all live there. Nothing else needs to change.
- **Score data** is ESPN's public scoreboard feed, fetched from each viewer's browser. If Auto-find can't match a game, open it on espn.com and copy the number after `/gameId/` in the URL into Admin → ESPN game ID → Save.
- **Two admin tiers:** Power admins (everything) and Payment admins (payments + rename/release squares). Set in Season setup; enforced server-side by the Firestore rules.
- **Identity is honor-system by email** with a type-it-twice check at sign-up. Each claim is tied to the phone that made it — only that phone (or an admin) can rename or release it, and only while the board is unlocked.
- **Wrong email / wants to move a square:** an admin taps the square to edit or release it.
- **Payments are private** — only admins can read them. Players see their own balance only.
- **Audit log:** every claim, release, draw, winner, payment change, and settings save is logged and can't be edited or deleted (Admin → Audit log).
- **"Fix didn't take" on an iPhone:** usually a cached old copy. When you upload changed files, bump the `?v=1` on `styles.css` and `app.js` in `index.html` to `?v=2`, and so on.
- **Free tier** (50K reads/day) is far more than 100 squares and a tailgate crowd will use, even on game day.
- **Test modes** (Season setup → Sport mode): soccer and MLB modes exist only for testing the live-score flow out of season. Leave it on LSU Football.
