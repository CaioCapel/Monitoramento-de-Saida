import { db } from "../js/firebase.js";
import { getDocs, collection, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

let dashboard = document.getElementById("dashboard");
let pontosTable = document.getElementById("pontos-table");

const colecaoRegistro = collection(db, "registro");
const colecaoPontos = collection(db, "pontos");

function formatHora(hora) {
  const [horas, minutos] = hora.split(":");
  return `${horas.padStart(2, '0')}:${minutos.padStart(2, '0')}`;
}

async function renderizarDashboard() {
  const arrayDocumentos = await getDocs(colecaoRegistro);
  dashboard.innerHTML = "";

  arrayDocumentos.forEach((doc_atual) => {
    const registro = {
      id: doc_atual.id,
      nome: doc_atual.get("nome"),
      departamento: doc_atual.get("departamento"),
      hora: formatHora(doc_atual.get("hora")),
      excluido: doc_atual.get("excluído") || false
    };

    if (!registro.excluido) {
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

      textContainer.append(ptexto);
      card.append(h2, textContainer);
      dashboard.append(card);
    }
  });
}

async function atualizarTabelaPontos() {
  pontosTable.innerHTML = "";

  // Adicione uma linha de cabeçalho
  const cabecalho = document.createElement("tr");
  const cabecalhoNome = document.createElement("th");
  const cabecalhoPontos = document.createElement("th");

  cabecalhoNome.textContent = "Nome";
  cabecalhoPontos.textContent = "Pontos";

  cabecalho.appendChild(cabecalhoNome);
  cabecalho.appendChild(cabecalhoPontos);
  pontosTable.appendChild(cabecalho);

  try {
    const querySnapshot = await getDocs(colecaoPontos);

    // Converter o QuerySnapshot para um array e ordenar por tamanho de nome
    const dadosOrdenados = Array.from(querySnapshot.docs)
      .sort((a, b) => a.data().nome.length - b.data().nome.length);

    dadosOrdenados.forEach((doc) => {
      const data = doc.data();

      const linha = document.createElement("tr");
      const colunaNome = document.createElement("td");
      const colunaPontos = document.createElement("td");

      colunaNome.textContent = data.nome;
      colunaPontos.textContent = data.pontos;

      colunaPontos.classList.add("centralizado");


      linha.appendChild(colunaNome);
      linha.appendChild(colunaPontos);
      pontosTable.appendChild(linha);
    });
  } catch (error) {
    console.error("Erro ao atualizar tabela de pontos:", error);
  }
}



// Chame as funções para renderizar o dashboard inicial e atualizar a tabela de pontos
renderizarDashboard();
atualizarTabelaPontos();

// Atualize a tabela de pontos a cada 60 segundos
setInterval(atualizarTabelaPontos, 60000);
