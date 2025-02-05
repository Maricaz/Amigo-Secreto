let participante = []; // Lista completa de participantes
let amigosDisponiveis = []; // Lista dinâmica para evitar repetições
let nomeAmigo = document.getElementById('amigo');

// Adiciona evento para pressionar "Enter" no input
if (nomeAmigo) {
    nomeAmigo.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Evita a submissão de formulário (se houver)
            adicionarAmigo(); // Adiciona o amigo automaticamente
        }
    });
}

function adicionarAmigo() {
    if (!nomeAmigo) {
        console.error("Elemento com ID 'amigo' não encontrado.");
        return;
    }

    let amigo = nomeAmigo.value.trim(); // Obtém o valor do input e remove espaços em branco

    if (amigo !== "" && !participante.includes(amigo)) {
        participante.push(amigo); // Adiciona ao array principal
        amigosDisponiveis.push(amigo); // Adiciona à lista de sorteio
        console.log(participante); // Exibe no console
        atualizarParticipante(); // Atualiza a lista visível
        nomeAmigo.value = ""; // Limpa o input
    } else {
        alert('Nome inválido ou já adicionado na lista de participantes.');
    }
}

function atualizarParticipante() {
    let listaAmigos = document.getElementById('listaAmigos');

    if (!listaAmigos) {
        console.error("Elemento com ID 'listaAmigos' não encontrado.");
        return;
    }

    listaAmigos.innerHTML = ""; // Limpa a lista para evitar duplicação

    participante.forEach(amigo => {
        let itemLista = document.createElement('li');
        itemLista.textContent = amigo;
        listaAmigos.appendChild(itemLista);
    });
}

function sortearAmigo() {
    if (participante.length === 0) {
        alert("A lista de participantes está vazia. Adicione amigos antes de sortear.");
        return;
    }

    if (participante.length < 3) { // Garante que há pelo menos três participantes
        alert('Adicione pelo menos três participantes antes de sortear.');
        return;
    }

    // Verifica se ainda há amigos disponíveis para sortear
    if (amigosDisponiveis.length === 0) {
        alert("Todos os participantes já foram sorteados! Reiniciando a lista.");
        amigosDisponiveis = [...participante]; // Reinicia a lista de sorteio
    }

    let nomeUsuario = nomeAmigo.value.trim(); // Supondo que o usuário digitou seu nome

    let amigoSorteado;
    while (true) {
        let sorteadoIndex = Math.floor(Math.random() * amigosDisponiveis.length);
        amigoSorteado = amigosDisponiveis[sorteadoIndex];

        if (amigoSorteado !== nomeUsuario) { // Se o nome sorteado for diferente do usuário
            amigosDisponiveis.splice(sorteadoIndex, 1); // Remove da lista de sorteáveis
            break;
        }
    }

    let resultado = document.getElementById('resultado');
    if (resultado) {
        resultado.innerHTML = `O amigo sorteado foi: <strong>${amigoSorteado}</strong>`;
    } else {
        console.error("Elemento com ID 'resultado' não encontrado.");
    }
}

function reiniciarSorteio() {
    participante = []; // Zera a lista de participantes
    amigosDisponiveis = []; // Zera a lista de disponíveis

    // Limpa a exibição da lista de amigos
    let listaAmigos = document.getElementById('listaAmigos');
    if (listaAmigos) {
        listaAmigos.innerHTML = ""; // Remove todos os <li>
    }

    // Limpa o campo de input
    if (nomeAmigo) {
        nomeAmigo.value = "";
    }

    // Limpa o resultado do sorteio
    let resultado = document.getElementById('resultado');
    if (resultado) {
        resultado.innerHTML = "";
    }

    alert("O sorteio foi reiniciado! Agora todos podem ser sorteados novamente.");
}

   
