/* =========================================================
   BRAND — the one file to edit to rename or re-team the board.
   Everything user-facing (header, browser tab, footer, Venmo note,
   export file names) reads from here.
   ========================================================= */
export const BRAND = {
  name: "LSU Squares",          // header, browser tab, Venmo note, exports
  slug: "lsu-squares",          // file names + archive tag (lowercase, dashes)
  cheer: "Geaux Tigers",        // footer + claim confirmation
  emoji: "🐯",

  // ESPN college-football team the board follows. LSU = 99.
  // Our team always rides the top axis; the opponent runs down the side.
  teamId: "99",
  teamName: "LSU",              // axis bar + board title ("LSU vs Alabama")
  teamShort: "LSU",             // compact labels ("LSU 24 — BAMA 17")

  // Sign-up form placeholders
  placeholders: { email: "mike@lsu.edu", first: "Mike", last: "Tiger", square: "Boudreaux" }
};
