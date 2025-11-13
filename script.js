const listaAgendados = document.getElementById('listaAgendados');
const listaTerminados = document.getElementById('listaTerminados');
const modalAdd = document.getElementById('modalAdd');
const modalEdit = document.getElementById('modalEdit');
const modalConcluir = document.getElementById('modalConcluir');
let eventoAtual = null;

let eventosAgendados = [
  { id: 1, titulo: "Ensaio Geral", data: "2025-11-15", hora: "19:00" },
  { id: 2, titulo: "Apresentação de Natal", data: "2025-12-10", hora: "20:00" }
];

let eventosTerminados = [
  { id: 3, titulo: "Concerto Primavera", data: "2025-10-01", hora: "18:00" }
];

function abrirModal(modal) {
  modal.style.display = 'flex';
}

function fecharModais() {
  modalAdd.style.display = 'none';
  modalEdit.style.display = 'none';
  modalConcluir.style.display = 'none';
}

function renderizarListas() {
  listaAgendados.innerHTML = '';
  listaTerminados.innerHTML = '';

  eventosAgendados.forEach(ev => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span><strong>${ev.titulo}</strong><br>${ev.data} - ${ev.hora}</span>
      <div class="acoes">
        <button onclick="abrirEditar(${ev.id})">✏️<!-- ADAPTAR: ícone SVG editar --></button>
        <button onclick="abrirConcluir(${ev.id})">✅<!-- ADAPTAR: ícone SVG concluir --></button>
      </div>`;
    listaAgendados.appendChild(li);
  });

  eventosTerminados.forEach(ev => {
    const li = document.createElement('li');
    li.innerHTML = `<span><strong>${ev.titulo}</strong><br>${ev.data} - ${ev.hora}</span>`;
    listaTerminados.appendChild(li);
  });
}

document.getElementById('btnAdd').addEventListener('click', () => abrirModal(modalAdd));
document.querySelectorAll('.fechar').forEach(btn => btn.addEventListener('click', fecharModais));

document.getElementById('salvarAdd').addEventListener('click', () => {
  const titulo = document.getElementById('tituloAdd').value.trim();
  const data = document.getElementById('dataAdd').value;
  const hora = document.getElementById('horaAdd').value;

  if (!titulo || !data || !hora) return alert("Preencha todos os campos!");

  const novo = { id: Date.now(), titulo, data, hora };
  eventosAgendados.push(novo);
  renderizarListas();
  fecharModais();
});

function abrirEditar(id) {
  eventoAtual = id;
  const ev = eventosAgendados.find(e => e.id === id);
  if (!ev) return;
  document.getElementById('tituloEdit').value = ev.titulo;
  document.getElementById('dataEdit').value = ev.data;
  document.getElementById('horaEdit').value = ev.hora;
  abrirModal(modalEdit);
}

document.getElementById('salvarEdit').addEventListener('click', () => {
  const ev = eventosAgendados.find(e => e.id === eventoAtual);
  if (!ev) return;
  ev.titulo = document.getElementById('tituloEdit').value;
  ev.data = document.getElementById('dataEdit').value;
  ev.hora = document.getElementById('horaEdit').value;
  renderizarListas();
  fecharModais();
});

function abrirConcluir(id) {
  eventoAtual = id;
  abrirModal(modalConcluir);
}

document.getElementById('confirmarConcluir').addEventListener('click', () => {
  const idx = eventosAgendados.findIndex(e => e.id === eventoAtual);
  if (idx === -1) return;
  const [ev] = eventosAgendados.splice(idx, 1);
  eventosTerminados.push(ev);
  renderizarListas();
  fecharModais();
});

renderizarListas();
