// Import Firebase SDKs from CDN for browser usage
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyCeJlcaSfJTa_yPNbZsAZterxI46sy4m0",
  authDomain: "catalogo-autoport.firebaseapp.com",
  projectId: "catalogo-autoport",
  storageBucket: "catalogo-autoport.firebasestorage.app",
  messagingSenderId: "610992591722",
  appId: "1:610992591722:web:6c0dfc2bd822dc54cc8b13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };
