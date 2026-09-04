import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { firebaseConfig, ADMIN_EMAIL } from "./firebase-config.js";

const app=initializeApp(firebaseConfig);
const auth=getAuth(app);
const form=document.querySelector("#loginForm"), error=document.querySelector("#loginError");
form.addEventListener("submit",async e=>{
  e.preventDefault(); error.textContent="";
  const email=document.querySelector("#email").value.trim();
  const password=document.querySelector("#password").value;
  if(email.toLowerCase()!==ADMIN_EMAIL.toLowerCase()){ error.textContent="Este usuario no está autorizado."; return; }
  try{
    await signInWithEmailAndPassword(auth,email,password);
    location.href="admin.html";
  }catch(err){ error.textContent="Correo o contraseña incorrectos."; }
});
