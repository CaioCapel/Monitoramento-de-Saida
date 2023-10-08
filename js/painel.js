import { db } from "../js/firebase.js";

import { getDocs, collection, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

let dashboard = document.getElementById("dashboard")

const colecao = collection(db, "registro")
const arrayDocumentos = await getDocs(colecao)

arrayDocumentos.forEach(doc_atual => {

  let card = document.createElement("div")
  card.setAttribute("class", "card")

  let h2 = document.createElement("h2")
  h2.setAttribute("class", "h2nome")
  h2.innerHTML = doc_atual.get("nome")

  let ptexto = document.createElement("p")
  ptexto.setAttribute("class", "ptexto")
  ptexto.innerHTML = `Foi Para - ${doc_atual.get("departamento")}`

  let phora = document.createElement("p")
  phora.setAttribute("class", "hora")
  phora.innerHTML = doc_atual.get("hora")

  let img = document.createElement("img")

  img.setAttribute("id", doc_atual.id)

  img.addEventListener('click', async () => {

    await deleteDoc(doc(db, "funcionario", event.target.id));
    
   
    
  });


  card.append(h2, ptexto, phora, img)
  dashboard.append(card)



  // document.getElementById("lixeira").addEventListener("click", async() =>{
  //   await deleteDoc(doc(db, "funcionarios",));
  //   })


  // esconde a mensagem
  document.querySelector('.mensagem').style.display = 'none';

});

setInterval(function(){
  location.reload();
}, 100000);


//Pontuação

const menuContainer = document.querySelector('.menu-container');
const openMenuBtn = document.querySelector('.open-menu-btn');
const closeMenuBtn = document.querySelector('.close-menu-btn');

openMenuBtn.addEventListener('click', async () => {
  menuContainer.classList.add('open');

  let listaItens = document.getElementById("lista-itens")


  const colecao = collection(db, "registro")
  const arrayDocumentos = await getDocs(colecao)

  arrayDocumentos.forEach((doc) => {
    if(doc.get("pontos") > 0){   
    let li = document.createElement("li")
    let spanNome = document.createElement("span")
    spanNome.innerHTML = doc.get("nome")

    let spanPontos = document.createElement("span")
    spanPontos.innerHTML = doc.get("pontos")

    li.append(spanNome, spanPontos)

    listaItens.append(li)}

  })

});

closeMenuBtn.addEventListener('click', () => {
  menuContainer.classList.remove('open');

  document.getElementById("lista-itens").innerHTML = null
});

function updateTime() {
	const clockElement = document.getElementById('clock');
	const currentTime = new Date();
	const hours = currentTime.getHours();
	const minutes = currentTime.getMinutes();
	clockElement.innerText = `${hours}:${minutes}`;
}

setInterval(updateTime, 1000);
