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
    renderizarTarefas();
    inputTarefa.value = "";
    inputTarefa.focus();
}

function renderizarTarefas() {
    listaTarefas.textContent = "";
    tarefas.forEach(function (tarefa, indice){
        const linha = document.createElement("tr");

        const colunaNumero = document.createElement("td");
        colunaNumero.textContent = indice + 1;

        const colunaNome = document.createElement("td");
        colunaNome.textContent = tarefa.texto;

        if (tarefa.concluida) {
            colunaNome.classList.add("concluida");
            colunaNome.classList.add("text-muted");
            colunaNome.style.textDecoration = "line-through";
        }

        const colunaStatus = document.createElement("td");
        if (tarefa.concluida) {
            colunaStatus.innerHTML = '<span class="badge text-bg-success">Concluída</span>';
        } else {
            colunaStatus.innerHTML = '<span class="badge text-bg-warning">Pendente</span>';
        }

        const colunaAçoes = document.createElement("td");

        const botaoConcluir = document.createElement("button");
        botaoConcluir.textContent = 
            tarefa.concluida 
                ? "Reabrir" 
                : "Concluir";
        botaoConcluir.classList.add(
            "btn", 
            tarefa.concluida 
                ? "btn-warning" 
                : "btn-success",
            "btn-sm",
            "me-2" 
        );
        botaoConcluir.addEventListener(
            "click",
             function() {
            alterarStatus(tarefa.id);
        });

        const botaoEditar = document.createElement("button");
        const botaoExcluir = document.createElement("button");

        colunaAçoes.appendChild(botaoConcluir);

        linha.appendChild(colunaNumero);
        linha.appendChild(colunaNome);
        linha.appendChild(colunaStatus);
        linha.appendChild(colunaAçoes);

        listaTarefas.appendChild(linha);
    });
}

function alterarStatus(id) {
    tarefas.forEach(function (tarefa) {
        if (tarefa.id === id) {
            tarefa.concluida = !tarefa.concluida;
        }
    });
    salvarTarefa();
    renderizarTarefas();
}

function salvarTarefa() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

renderizarTarefas();