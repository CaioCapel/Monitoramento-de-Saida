import { db } from "../js/firebase.js";
import { getDocs, collection, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

let dashboard = document.getElementById("dashboard")

const colecao = collection(db, "registro")
const arrayDocumentos = await getDocs(colecao)

// ...

arrayDocumentos.forEach(async (doc_atual) => {
  if (doc_atual.get("excluído") === true) {
    return;
  }

  let card = document.createElement("div");
  card.setAttribute("class", "card");

  let h2 = document.createElement("h2");
  h2.setAttribute("class", "h2nome");
  h2.innerHTML = doc_atual.get("nome");

  let textContainer = document.createElement("div"); // Contêiner para "departamento" e "hora"
  textContainer.setAttribute("class", "text-container");

  let ptexto = document.createElement("p");
  ptexto.setAttribute("class", "ptexto");

  // Aqui você concatena o texto desejado entre a hora e o departamento
  ptexto.innerHTML = `Foi para - ${doc_atual.get("departamento")} às - ${doc_atual.get("hora")} hrs`;

  let img = document.createElement("img");
  img.setAttribute("id", doc_atual.id);

  img.addEventListener('click', async () => {
    await updateDoc(doc(colecao, doc_atual.id), { excluído: true });
    card.remove();
  });

  textContainer.append(ptexto); // Adicione o texto ao contêiner
  card.append(h2, textContainer, img);
  dashboard.append(card);
  // Resto do seu código...
});

// ...


setInterval(function(){
  location.reload();
}, 60000);


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