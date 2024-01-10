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

        // Botão para esconder o registro
        const hideButton = document.createElement("button");
        hideButton.textContent = "Excluir";
        hideButton.addEventListener("click", () => {
          // Exibir o modal de confirmação
          document.getElementById("confirmModal").style.display = "flex";

          // Evento de clique no botão "Sim, com pontos"
          document.getElementById("confirmYes").addEventListener("click", async () => {
            // Lógica para excluir com pontos
            await excluirRegistro(doc, data, true);
          });

          // Evento de clique no botão "Não, sem pontos"
          document.getElementById("confirmNo").addEventListener("click", async () => {
            // Lógica para excluir sem pontos
            await excluirRegistro(doc, data, false);
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
async function excluirRegistro(doc, data, comPontos) {
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
    }

    exibirHistorico();
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

// Evento de clique no botão "Voltar ao Formulário"
document.getElementById("voltarAoFormulario").addEventListener("click", function () {
  // Redireciona o usuário para a página do formulário (substitua 'formulario.html' pelo caminho correto)
  window.location.href = "form.html";
});

// Chama a função para exibir o histórico quando a página carrega
exibirHistorico();
