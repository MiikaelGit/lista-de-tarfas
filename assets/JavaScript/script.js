const input = document.querySelector("[data-form-input]");
const botao = document.querySelector("[data-form-button]");
const lista = document.querySelector("[data-lista]");

let tarefas = [];

function renderizaTarefa(valor, concluida = false) {
  const tarefa = document.createElement("li");
  tarefa.classList.add("principal__tarefas___item");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = concluida;
  const span = document.createElement("span");
  span.classList.add("principal__texto");
  span.innerText = valor;
  if (concluida) {
    span.style.textDecoration = "line-through";
  }
  const botaoRemover = document.createElement("button");
  const spanDesktop = document.createElement("span");
  spanDesktop.classList.add("desktop");
  botaoRemover.appendChild(spanDesktop);
  const spanMobile = document.createElement("span");
  spanMobile.classList.add("mobile");
  botaoRemover.appendChild(spanMobile);
  spanDesktop.innerText = "Remover";
  spanMobile.innerText = "X";
  botaoRemover.onclick = removeTarefa;
  lista.appendChild(tarefa);
  tarefa.appendChild(checkbox);
  checkbox.classList.add("check");
  tarefa.appendChild(span);
  tarefa.appendChild(botaoRemover);
  tarefa.addEventListener("change", function (event) {
    const li = event.target.parentElement;
    const span = li.querySelector("span");
    const checado = event.target.checked;
    if (checado) {
      span.style.textDecoration = "line-through";
    } else {
      span.style.textDecoration = "none";
    }
    tarefas = tarefas.map((tarefa) => {
      if (tarefa.titulo === span.textContent) {
        return {
          titulo: tarefa.titulo,
          concluida: !tarefa.concluida,
        };
      } else {
        return tarefa;
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tarefas));
  });
}

window.onload = () => {
  const tarefasNoLocalStorage = localStorage.getItem("tasks");

  if (!tarefasNoLocalStorage) return;

  tarefas = JSON.parse(tarefasNoLocalStorage);
  tarefas.forEach((tarefa) => {
    renderizaTarefa(tarefa.titulo, tarefa.concluida);
  });
};

function adicionaTarefa(event) {
  event.preventDefault();
  const valor = input.value;
  if (valor.length == 0) {
    alert("Por favor, digite algo!");
  } else if (valor.length < 3) {
    alert("Sua tarefa precisa ter, no mínimo, 3 caracteres!");
    input.value = "";
    return;
  } else {
    tarefas.push({
      titulo: valor,
      concluida: false,
    });
    localStorage.setItem("tasks", JSON.stringify(tarefas));
    renderizaTarefa(valor);
    input.value = "";
    input.focus();
  }
}

function removeTarefa(event) {
  const li = event.target.parentNode.parentNode;
  li.remove();
  const liRemover = li.querySelector("span").textContent;
  console.log(liRemover);
  tarefas = tarefas.filter((tarefa) => tarefa.titulo !== liRemover);
  localStorage.setItem("tasks", JSON.stringify(tarefas));
}

botao.onclick = adicionaTarefa;
