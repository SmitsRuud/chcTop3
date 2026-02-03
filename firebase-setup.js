// firebase-setup.js
// Centralized Firebase bootstrapping + small UI helpers for login status and protection.

import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// 1) Paste your real config here (from Firebase Console > Project settings > General > Your apps)
const firebaseConfig = {
  apiKey: "AIzaSyC5Mqxi1qLYvjq2QghqjcCAaT4ZYccWI04",
  authDomain: "chctop3-524d2.firebaseapp.com",
  projectId: "chctop3-524d2",
};

// 2) Initialize only once (prevents duplicate-initialization errors when used on many pages)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Keep users logged in across reloads (non-blocking; safe if it fails)
setPersistence(auth, browserLocalPersistence).catch(() => { /* ignore */ });

// --- UI helpers ---

/**
 * Renders a subtle top-right login status bar.
 * - When logged in: shows email + "Log uit" button
 * - When logged out: shows "Inloggen" link
 *
 * Call this on every page that has <div id="loginStatus"></div>.
 */
export function initLoginStatus(opts = {}) {
  const {
    containerId = "loginStatus",
    loginUrl = "inloggen.html",
    showEmail = true
  } = opts;

  const el = document.getElementById(containerId);
  if (!el) return;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const label = showEmail ? (user.email ?? "Ingelogd") : "Ingelogd";
      el.innerHTML = `
        <span class="login-status__label">${label}</span>
        <button type="button" id="logoutButton" class="logout-btn" aria-label="Log uit">Log uit</button>
      `;
      const btn = document.getElementById("logoutButton");
      if (btn) btn.addEventListener("click", () => signOut(auth));
    } else {
      el.innerHTML = `${loginUrl}Inloggen</a>`;
    }
  });
}

/**
 * Redirects to `redirectTo` if the user is NOT logged in.
 * Use this at the bottom of protected pages (e.g. stem-op-jouw-top-3.html).
 */
export function requireAuth(redirectTo = "inloggen.html") {
  onAuthStateChanged(auth, (user) => {
    if (!user) window.location.href = redirectTo;
  });
}
