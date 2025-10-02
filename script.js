const STORAGE_KEY = 'registroCarrinhos_v2';

const nomeEl = document.getElementById('nome');
const c1El = document.getElementById('c1');
const c2El = document.getElementById('c2');
const dataSaidaEl = document.getElementById('dataSaida');
const dataPrevEl = document.getElementById('dataPrevista');
const btnRegistrar = document.getElementById('btnRegistrar');
const tableInUseBody = document.querySelector('#tableInUse tbody');
const tableHistoryBody = document.querySelector('#tableHistory tbody');
const notReturnedContainer = document.getElementById('notReturnedContainer');
const countInUse = document.getElementById('countInUse');
const countHistory = document.getElementById('countHistory');
const btnClear = document.getElementById('btnClear');
const btnSeed = document.getElementById('btnSeed');
const btnExport = document.getElementById('btnExport');

// Função de datas corrigida
function toDisplayDate(iso){
  if(!iso) return '-';
  const [y,m,d] = iso.split('-');
  const date = new Date(y, m-1, d);
  return date.toLocaleDateString('pt-BR');
}

function formatDateToInput(d = new Date()){
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth()+1).padStart(2,'0');
  const dd = String(d.getDate()).padStart(2,'0');
  return `${yyyy}-${mm}-${dd}`;
}

dataSaidaEl.value = formatDateToInput();

function loadData(){ return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
function saveData(arr){ localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }
function uid(){ return 'id_' + Math.random().toString(36).slice(2,9); }

function isOverdue(item){
  if(!item.dataPrevista || item.status==='devolvido') return false;
  const today = new Date(); today.setHours(0,0,0,0);
  const [y,m,d] = item.dataPrevista.split('-');
  const prev = new Date(y,m-1,d);
  return prev < today;
}

function render(){
  const data = loadData();
  const inUse = data.filter(r=>r.status==='emuso');
  const history = data.filter(r=>r.status==='devolvido');
  const overdue = inUse.filter(isOverdue);

  // Alert de atrasados
  if(overdue.length){
    notReturnedContainer.innerHTML = `<div class="alert">
      <strong>Atenção — ${overdue.length} carrinho(s) com devolução prevista vencida:</strong>
      <ul style="margin-top:8px">
      ${overdue.map(r=>`<li><strong>${r.nome}</strong> — ${r.carrinho1}${r.carrinho2?' / '+r.carrinho2:''} — saída: ${toDisplayDate(r.dataSaida)} — prevista: ${toDisplayDate(r.dataPrevista)}</li>`).join('')}
      </ul>
    </div>`;
  } else notReturnedContainer.innerHTML = '';

  // Carrinhos em uso
  tableInUseBody.innerHTML = '';
  inUse.forEach(item=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${escapeHtml(item.nome)}</td>
      <td>${escapeHtml(item.carrinho1)}</td>
      <td>${escapeHtml(item.carrinho2||'-')}</td>
      <td>${toDisplayDate(item.dataSaida)}</td>
      <td>${toDisplayDate(item.dataPrevista)}</td>
      <td><span class="badge inuse">Em uso</span></td>
      <td class="actions">
        <button class="btn btn-primary" data-id="${item.id}" data-action="devolver">Registrar Devolução</button>
        <button class="btn btn-ghost" data-id="${item.id}" data-action="editar">Editar</button>
      </td>`;
    tableInUseBody.appendChild(tr);
  });

  // Histórico
  tableHistoryBody.innerHTML='';
  history.forEach(item=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${escapeHtml(item.nome)}</td>
      <td>${escapeHtml(item.carr
