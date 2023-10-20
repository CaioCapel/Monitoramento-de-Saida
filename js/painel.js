import { db } from "../js/firebase.js";
import { getDocs, collection, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

let dashboard = document.getElementById("dashboard")

const colecao = collection(db, "registro");

// Função para formatar a hora
function formatHora(hora) {
  const [horas, minutos] = hora.split(":");
  return `${horas.padStart(2, '0')}:${minutos.padStart(2, '0')}`;
}

async function renderizarDashboard() {
  const arrayDocumentos = await getDocs(colecao);

  // Coletar documentos e criar um array de objetos
  const registros = [];
  arrayDocumentos.forEach((doc_atual) => {
    if (doc_atual.get("excluído") === true) {
      return;
    }
    registros.push({
      nome: doc_atual.get("nome"),
      departamento: doc_atual.get("departamento"),
      hora: formatHora(doc_atual.get("hora")),
      id: doc_atual.id
    });
  });

  // Ordenar o array de objetos com base na hora
  registros.sort((a, b) => {
    return a.hora.localeCompare(b.hora);
  });

  // Limpar o dashboard antes de renderizar novamente
  dashboard.innerHTML = "";

  // Criar elementos HTML a partir do array ordenado
  registros.forEach((registro) => {
    let card = document.createElement("div");
    card.setAttribute("class", "card");

    let h2 = document.createElement("h2");
    h2.setAttribute("class", "h2nome");
    h2.innerHTML = registro.nome;

    let textContainer = document.createElement("div");
    textContainer.setAttribute("class", "text-container");

    let ptexto = document.createElement("p");
    ptexto.setAttribute("class", "ptexto");
    ptexto.innerHTML = `Foi para - ${registro.departamento} - às ${registro.hora} hrs`;

    let img = document.createElement("img");
    img.setAttribute("id", registro.id);

    img.addEventListener('click', async () => {
      // Atualize o documento conforme necessário
      await updateDoc(colecao, registro.id, { excluído: true });
      card.remove();
    });

    textContainer.append(ptexto);
    card.append(h2, textContainer, img);
    dashboard.append(card);
  });
}

// Chame a função para renderizar o dashboard inicial
renderizarDashboard();

setInterval(function(){
  // Atualize o dashboard a cada 60 segundos
  renderizarDashboard();
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