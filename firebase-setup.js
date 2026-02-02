// firebase-setup.js
import { 
  initializeApp 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import { 
  getAuth, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

export const firebaseConfig = {
  apiKey: "AIzaSyC5Mqxi1qLYvjq2QghqjcCAaT4ZYccWI04",
  authDomain: "chctop3-524d2.firebaseapp.com",
  projectId: "chctop3-524d2",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Handle logout button on each page (if present)
export function initLogoutButton() {
  const btn = document.getElementById("logoutButton");
  if (!btn) return;
  btn.addEventListener("click", () => {
    signOut(auth);
  });
}

// Display login status on every page
export function initLoginStatus() {
  const container = document.getElementById("loginStatus");
  if (!container) return;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      container.innerHTML = `
        Ingelogd als: <strong>${user.email}</strong>
        <button id="logoutButton" class="logout-btn">Log uit</button>
      `;
      initLogoutButton();
    } else {
      container.innerHTML = `
        <a href="inloggen.html/a>
      `;
    }
  });
}
``
