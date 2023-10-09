import { db } from "../js/firebase.js";
import { collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Função para exibir registros no histórico
async function exibirHistorico() {
  const historicoList = document.getElementById("historico-list");
  historicoList.innerHTML = ""; // Limpa a lista

  try {
    const querySnapshot = await getDocs(collection(db, "registro"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      
      // Verifique se o campo "excluído" é verdadeiro antes de exibir o registro
      if (!data.excluído) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${data.RE} - ${data.nome} - ${data.departamento} - ${data.hora}`;
        
        // Botão para esconder o registro
        const hideButton = document.createElement("button");
        hideButton.textContent = "Esconder";
        hideButton.addEventListener("click", async () => {
          const shouldHide = window.confirm("Tem certeza que deseja esconder este registro?");
          if (shouldHide) {
            try {
              // Defina o campo "excluído" como true no Firestore em vez de excluir o documento
              await updateDoc(doc.ref, { excluído: true });
              exibirHistorico();
            } catch (error) {
              console.error("Erro ao esconder registro:", error);
            }
          }
        });
        
        listItem.appendChild(hideButton);
        historicoList.appendChild(listItem);
      }
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
