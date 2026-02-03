// firebase-setup.js

import { 
  initializeApp 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import { 
  getAuth, 
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Inject login status bar
export function initLoginStatus() {
  const container = document.getElementById("loginStatus");
  if (!container) return;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      container.innerHTML = `
        <span>${user.email}</span>
        <button id="logoutButton" class="logout-btn">Log uit</button>
      `;

      document.getElementById("logoutButton").addEventListener("click", () => {
        signOut(auth);
      });

    } else {
      container.innerHTML = `
        <a href="inloggen.html" style="color:white; text-decoration
