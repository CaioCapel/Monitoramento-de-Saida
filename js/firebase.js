import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"
import { getFirestore} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"

 // Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyCTRbr4nsRuxzVtXd4k9OBMSZjoDwfFaZE",
  authDomain: "controle-de-saida-aa913.firebaseapp.com",
  projectId: "controle-de-saida-aa913",
  storageBucket: "controle-de-saida-aa913.appspot.com",
  messagingSenderId: "197666140397",
  appId: "1:197666140397:web:72da3c3a368f8cb09e5ce4"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  /* Constantes necessárias para utilização dos métodos do Firebase que serão exportadas em outros arquivos. */
export const auth = getAuth(app)

export const db = getFirestore(app)

  





