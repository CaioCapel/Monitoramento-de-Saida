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

// Define a hora atual
const horaAtual = new Date();
const hora = horaAtual.getHours();
const minutos = horaAtual.getMinutes();
const horaInput = document.getElementById('horario');
horaInput.value = `${hora}:${minutos}`;

// Evento de clique no botão "registrarsaida"
document.getElementById("registrarsaida").addEventListener("click", function () {
  let RE = document.getElementById("RE").value;
  let nomefuncionario = document.getElementById("nome").value;
  let departamento = document.getElementById("departamento").value;
  let horario = document.getElementById("horario").value;
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


  // Seleciona o modal
  var modal = document.getElementById("myModal");

  // Seleciona o botão que abre o modal
  var btn = document.getElementById("myBtn");

  // Seleciona o botão para selecionar o funcionário
  var selectBtn = document.getElementById("selectButton");

  // Seleciona o elemento select com os funcionários
  var select = document.getElementById("employeeSelect");

  // Seleciona o elemento input que receberá o valor selecionado
  var input = document.getElementById("nome");

  // Quando o usuário clicar no botão, abre o modal
  btn.onclick = function () {
    modal.style.display = "block";
  };

  // Quando o usuário clicar no botão de
  selectBtn.onclick = function () {
    // Atualiza o valor do input com o valor selecionado no select
    input.value = select.value;

    // Fecha o modal
    modal.style.display = "none";
  };

  // Quando o usuário clicar no "x" para fechar o modal, fecha o modal
  var span = document.getElementsByClassName("close")[0];
  span.onclick = function () {
    modal.style.display = "none";
  };

  // Quando o usuário clicar fora do modal, fecha o modal
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  const horaAtual = new Date();
  const hora = horaAtual.getHours();
  const minutos = horaAtual.getMinutes();
  const horaInput = document.getElementById('horario');
  horaInput.value = `${hora}:${minutos}`;
});

// Evento de clique no botão "Acessar Histórico"
document.getElementById("acessarHistorico").addEventListener("click", function () {
  // Redireciona o usuário para a página de histórico (substitua 'historico.html' pelo caminho correto)
  window.location.href = "historico.html";
});
