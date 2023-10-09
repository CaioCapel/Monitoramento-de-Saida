import { db } from "../js/firebase.js";
import { collection, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Função para exibir registros no histórico
async function exibirHistorico() {
  const historicoList = document.getElementById("historico-list");
  historicoList.innerHTML = ""; // Limpa a lista

  try {
    const querySnapshot = await getDocs(collection(db, "registro"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const listItem = document.createElement("li");
      listItem.innerHTML = `${data.RE} - ${data.nome} - ${data.departamento} - ${data.hora}`;

      // Botão para excluir o registro
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Excluir";
      deleteButton.addEventListener("click", async () => {
        // Adicionar uma confirmação antes de excluir
        const shouldDelete = window.confirm("Tem certeza que deseja excluir este registro?");
        
        if (shouldDelete) {
          try {
            await deleteDoc(doc.ref);
            exibirHistorico(); // Atualiza o histórico após a exclusão
          } catch (error) {
            console.error("Erro ao excluir registro:", error);
          }
        }
      });

      listItem.appendChild(deleteButton);
      historicoList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Erro ao buscar registros:", error);
  }
}

// Evento de clique no botão "Voltar ao Formulário"
document.getElementById("voltarAoFormulario").addEventListener("click", function () {
  // Redireciona o usuário para a página do formulário (substitua 'formulario.html' pelo caminho correto)
  window.location.href = "form.html";
});

// Chama a função para exibir o histórico quando a página carrega
exibirHistorico();
