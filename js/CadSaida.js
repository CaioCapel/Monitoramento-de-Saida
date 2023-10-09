import { db } from "../js/firebase.js";
import { setDoc, collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Evento para atualizar o campo "nome" com base no RE
document.getElementById("RE").addEventListener("change", function () {
  // ... (seu código para buscar o nome com base no RE)
});

// Define a hora atual
const horaAtual = new Date();
const hora = horaAtual.getHours();
const minutos = horaAtual.getMinutes();
const horaInput = document.getElementById('horario');
horaInput.value = `${hora}:${minutos}`;

// Evento de clique no botão "registrarsaida"
document.getElementById("registrarsaida").addEventListener("click", function () {
  // ... (seu código para registrar a saída)
});

// Evento de clique no botão "Acessar Histórico"
document.getElementById("acessarHistorico").addEventListener("click", function () {
  // Redireciona o usuário para a página de histórico (substitua 'historico.html' pelo caminho correto)
  window.location.href = "historico.html";
});
