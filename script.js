const saidaForm = document.getElementById("saidaForm");
const tabelaSaidas = document.getElementById("tabelaSaidas").querySelector("tbody");
const tabelaHistorico = document.getElementById("tabelaHistorico").querySelector("tbody");

// Função para obter data e hora formatadas
function dataHoraAtual() {
  const agora = new Date();
  const data = agora.toLocaleDateString("pt-BR");
  const hora = agora.toLocaleTimeString("pt-BR");
  return { data, hora };
}

// Registrar saída
saidaForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const carrinho1 = document.getElementById("carrinho1").value;
  const carrinho2 = document.getElementById("carrinho2").value;

  const { data, hora } = dataHoraAtual();

  // Criar linha na tabela de saídas
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${nome}</td>
    <td>${carrinho1}</td>
    <td>${carrinho2}</td>
    <td>${data}</td>
    <td>${hora}</td>
    <td><button class="retornoBtn">Registrar Retorno</button></td>
  `;

  // Evento para marcar retorno
  row.querySelector(".retornoBtn").addEventListener("click", function () {
    const { data: dataRetorno, hora: horaRetorno } = dataHoraAtual();

    // Mover para histórico
    const historicoRow = document.createElement("tr");
    historicoRow.innerHTML = `
      <td>${nome}</td>
      <td>${carrinho1}</td>
      <td>${carrinho2}</td>
      <td>${data}</td>
      <td>${hora}</td>
      <td>${dataRetorno}</td>
      <td>${horaRetorno}</td>
    `;
    tabelaHistorico.appendChild(historicoRow);

    // Remover da tabela de saídas
    row.remove();
  });

  tabelaSaidas.appendChild(row);

  // Resetar formulário
  saidaForm.reset();
});