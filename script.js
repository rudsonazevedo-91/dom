// Métodos DOM
const form = document.querySelector("#form-tarefa");
const inputTarefa = document.querySelector("#tarefa");
const contador = document.querySelector("#contador");
const listaTarefas = document.querySelector("#lista-tarefas");

const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

form.addEventListener("submit", adicionarTarefa);

function adicionarTarefa(event) {
    event.preventDefault();

    const texto = inputTarefa.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const novaTarefa = {
        id: Date.now(),
        texto: texto,
        concluida: false
    };

    tarefas.push(novaTarefa);
    salvarTarefa();
    inputTarefa.value = "";
    inputTarefa.focus();

    renderizarTarefas();
}

function salvarTarefa() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

