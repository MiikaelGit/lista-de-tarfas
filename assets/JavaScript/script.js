const input = document.querySelector('[data-form-input]');
const botao = document.querySelector('[data-form-button]');
const lista = document.querySelector('[data-lista]');

function adicionaTarefa(evento) {
    evento.preventDefault();
    const valor = input.value;
    if(valor.length == 0) {
        alert('Por favor, digite algo!');
    }else{
        const tarefa = document.createElement('li');
        tarefa.classList.add('principal__tarefas___item');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        const texto = ` <span class="principal__texto">
                            ${valor}
                        </span>
                        <button onclick="removeTarefa(event)">
                            Remover
                        </button>`;
        lista.appendChild(tarefa);
        tarefa.appendChild(checkbox);
        checkbox.classList.add('check');
        tarefa.innerHTML += texto;

        atualiza();
    }
    input.value = "";
}

function removeTarefa(event){
    event.target.parentNode.remove();
}

function concluida() {
    let check = document.querySelectorAll('.check');
    let tarefasTexto = document.querySelectorAll(`.principal__texto`);
    for(let i = 0; i < tarefasTexto.length; i++){
        if(check[i].checked){
                console.log('ssss');
                tarefasTexto[i].classList.add('concluida');
        }else{
                tarefasTexto[i].classList.remove('concluida');
        }
    }
    
    
}

function atualiza(){
    let check = document.querySelectorAll('.check');
    for(let c = 0; c < check.length; c++){
        check[c].addEventListener('click', function(){
            concluida();
        })
    }
        
}

botao.onclick = adicionaTarefa;