import { auth } from "../js/firebase.js"

import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"

document.getElementById("login").addEventListener("click", () => {
    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value
    
    const autenticacao = getAuth()
    signInWithEmailAndPassword(autenticacao, email, senha)
        .then((userCredential) => {
       
            window.location.href = "./form.html"

        })
      
        .catch((error) => {
            alert("Erro no login.")
        });
})
let inputs = document.getElementsByClassName('input-form');
		for (let input of inputs) {
			input.addEventListener("blur", function() {
				if(input.value.trim() != ""){
					input.classList.add("has-val");
				} else {
					input.classList.remove("has-val");
				}
			});
		}


