import { db } from "../js/firebase.js";
import { collection, getDocs, doc, updateDoc, addDoc, query, where, getDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Função para exibir registros no histórico
async function exibirHistorico() {
  const historicoList = document.getElementById("historico-list");
  historicoList.innerHTML = ""; // Limpa a lista

  try {
    const querySnapshot = await getDocs(collection(db, "registro"));
    querySnapshot.forEach(async (doc) => {
      const data = doc.data();

      // Verifique se o campo "excluído" é verdadeiro antes de exibir o registro
      if (!data.excluído) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${data.RE} - ${data.nome} - ${data.departamento} - ${data.hora}`;

        // Botão para excluir o registro
        const hideButton = document.createElement("button");
        hideButton.textContent = "Excluir";
        hideButton.addEventListener("click", () => {
          // Exibir o modal de confirmação
          document.getElementById("confirmModal").style.display = "flex";

          // Evento de clique no botão "Sim, com pontos"
          document.getElementById("confirmYes").addEventListener("click", async () => {
            // Solicitar o motivo da exclusão
            const motivo = prompt("Digite o motivo da exclusão:");

            if (motivo) {
              // Lógica para excluir com pontos e adicionar o motivo
              await excluirRegistro(doc, data, true, motivo);
            } else {
              alert("O motivo da exclusão é obrigatório!");
            }
          });

          // Evento de clique no botão "Não, sem pontos"
          document.getElementById("confirmNo").addEventListener("click", async () => {
            // Lógica para excluir sem pontos e sem motivo
            await excluirRegistro(doc, data, false, "");
          });
        });

        listItem.appendChild(hideButton);
        historicoList.appendChild(listItem);
      }
    });
  } catch (error) {
    console.error("Erro ao buscar registros:", error);
  }
}

// Função para excluir o registro com ou sem pontos
async function excluirRegistro(doc, data, comPontos, motivo) {
  try {
    // Defina o campo "excluído" como true no Firestore em vez de excluir o documento
    await updateDoc(doc.ref, { excluído: true });

    if (comPontos) {
      // Consulta à coleção "pontos" para encontrar o documento correto
      const pontosQuery = query(collection(db, "pontos"), where("nome", "==", data.nome));
      const pontosSnapshot = await getDocs(pontosQuery);

      if (!pontosSnapshot.empty) {
        // Se encontrou um documento na coleção "pontos", atualiza os pontos somando 1
        const pontosDoc = pontosSnapshot.docs[0];
        const pontosAtuais = pontosDoc.data().pontos || 0;

        // Adiciona 1 ponto
        const novosPontos = pontosAtuais + 1;

        await updateDoc(pontosDoc.ref, {
          pontos: novosPontos
        });
      } else {
        // Se não encontrou um documento na coleção "pontos", adiciona um novo com 1 ponto
        await addDoc(collection(db, "pontos"), {
          nome: data.nome,
          pontos: 1
        });
      }

      // Adiciona o motivo da exclusão à coleção motivoExclusao
      await addDoc(collection(db, "motivoExclusao"), {
        nome: data.nome,
        motivo: motivo,
        hora: new Date().toLocaleString() // Adiciona a hora atual
      });
    }

    exibirHistorico();
    atualizarTabelaMotivosExclusao();
  } catch (error) {
    console.error("Erro ao excluir registro:", error);
  } finally {
    // Fechar o modal após a execução
    fecharModal();
  }
}

// Função para fechar o modal
function fecharModal() {
  document.getElementById("confirmModal").style.display = "none";

  // Limpar os eventos de clique para evitar adicionar múltiplos
  document.getElementById("confirmYes").removeEventListener("click", () => {});
  document.getElementById("confirmNo").removeEventListener("click", () => {});
}

/*
async function atualizarTabelaMotivosExclusao() {
  const tabelaMotivos = document.getElementById("motivos-table-body");
  tabelaMotivos.innerHTML = ""; 
  try {
    const querySnapshot = await getDocs(collection(db, "motivoExclusao"));
    querySnapshot.forEach((doc) => {
      const motivoData = doc.data();
      const row = document.createElement("tr");
      const nomeCell = document.createElement("td");
      const motivoCell = document.createElement("td");
      const horaCell = document.createElement("td");

      nomeCell.textContent = motivoData.nome;
      motivoCell.textContent = motivoData.motivo;
      horaCell.textContent = motivoData.hora;

      row.appendChild(horaCell);
      row.appendChild(nomeCell);
      row.appendChild(motivoCell);
      
      tabelaMotivos.appendChild(row);
    });
  } catch (error) {
    console.error("Erro ao buscar motivos de exclusão:", error);
  }
}
*/

// Chama a função para exibir o histórico e a tabela de motivos quando a página carrega
exibirHistorico();
atualizarTabelaMotivosExclusao();
