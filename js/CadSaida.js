import { db } from "../js/firebase.js";
import { setDoc, collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Evento para atualizar o campo "nome" com base no RE
document.getElementById("RE").addEventListener("change", function () {
  const RE = this.value;

  // Verifica se o campo RE não está vazio
  if (RE.trim() === "") {
    return;
  }

  // Consulta o Firestore para obter o nome do funcionário com base no RE
  const funcionarioDocRef = doc(db, "registro", RE);
  getDoc(funcionarioDocRef)
    .then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const nomeFuncionario = data.nome;
        document.getElementById("nome").value = nomeFuncionario;
      } else {
        // Se o RE não corresponder a nenhum funcionário, você pode tratar isso aqui
        alert("RE não encontrado");
        document.getElementById("nome").value = ""; // Limpa o campo nome
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar funcionário:", error);
    });
});

// Evento de clique no botão "registrarsaida"
document.getElementById("registrarsaida").addEventListener("click", function () {
  let RE = document.getElementById("RE").value;
  let nomefuncionario = document.getElementById("nome").value;
  let departamento = document.getElementById("departamento").value;

  // Define a hora atual
  const horaAtual = new Date();
  const hora = horaAtual.getHours();
  const minutos = horaAtual.getMinutes();
  const horario = `${hora}:${minutos}`;
  
  alert(`${nomefuncionario} ${departamento} ${horario}`);

  setDoc(doc(db, "registro", RE), {
    nome: nomefuncionario,
    departamento: departamento,
    hora: horario,
    RE: RE,
    pontos: "",
  });

  // Limpa os campos após o registro
  document.getElementById("RE").value = "";
  document.getElementById("nome").value = "";
  document.getElementById("departamento").value = "";
  // Se você quiser manter a hora atual, remova a próxima linha
  document.getElementById("horario").value = "";
});

// Evento de clique no botão "Acessar Histórico"
document.getElementById("acessarHistorico").addEventListener("click", function () {
  // Redireciona o usuário para a página de histórico (substitua 'historico.html' pelo caminho correto)
  window.location.href = "historico.html";
});
