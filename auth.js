import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { app } from "./firebase-config.js";

const auth = getAuth(app);
const form = document.querySelector("#loginForm");
const error = document.querySelector("#loginError");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (error) error.textContent = "";
  
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "admin.html";
  } catch (err) {
    if (error) error.textContent = "Correo o contraseña incorrectos.";
  }
});
