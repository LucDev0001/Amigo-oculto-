// Lista de participantes e imagens
const participants = [
    { src: 'img1.jpg', name: 'Viviane' },
    { src: 'img2.jpg', name: 'Bruno' },
    { src: 'img3.jpg', name: 'Douglas' },
    { src: 'img4.jpg', name: 'Edson' },
    { src: 'img5.jpg', name: 'Renan' },
    { src: 'img6.jpg', name: 'Luciano' },
    { src: 'img7.jpg', name: 'Renato' },
    { src: 'img8.jpg', name: 'Gilmar' },
    { src: 'img9.jpg', name: 'Samuel' },
    { src: 'img10.jpg', name: 'Miguel' },
    { src: 'img11.jpg', name: 'Geferson' },
    { src: 'img12.jpg', name: 'Bruna' },
    { src: 'img13.jpg', name: 'Edilson' }
];

let revealedNames = []; // Para armazenar os nomes que já foram sorteados
let currentTurn = 0; // Começa com a primeira pessoa
const slots = Array.from(document.querySelectorAll('.slot'));
const spinButton = document.getElementById('spinButton');
const result = document.getElementById('result');
const currentPerson = document.getElementById('currentPerson');
const turnMessage = document.getElementById('turnMessage');
const resetButton = document.getElementById('resetButton');

// Função para girar os slots
function spinSlots() {
    spinButton.disabled = true; // Desabilita o botão enquanto os slots giram
    result.textContent = ''; // Limpa o resultado
    resetButton.classList.add('hidden'); // Esconde o botão de reinício
    turnMessage.classList.add('hidden'); // Esconde a mensagem da vez

    // Coloca as imagens padrão nos slots antes de começar a girar
    slots.forEach(slot => {
        slot.querySelector('img').src = 'default.jpg'; // Coloca a imagem padrão
    });

    // Gira os slots por 2 segundos
    let spins = 0;
    const interval = setInterval(() => {
        spins++;
        slots.forEach(slot => {
            // Coloca uma imagem aleatória dos participantes restantes
            const randomIndex = Math.floor(Math.random() * participants.length);
            const randomParticipant = participants[randomIndex];
            slot.querySelector('img').src = randomParticipant.src; // Muda a imagem aleatoriamente
        });

        if (spins === 20) { // Para de girar após 2 segundos
            clearInterval(interval);
            showResult(); // Mostra o resultado final
        }
    }, 100); // Atualiza a cada 100ms
}

// Função para exibir o resultado após os slots girarem
function showResult() {
    // Filtra os participantes para não permitir que a pessoa tire seu próprio nome ou o nome de quem já foi sorteado
    let availableParticipants = participants.filter(p => p.name !== participants[currentTurn].name && !revealedNames.includes(p.name));

    // Se todos os nomes foram sorteados, reinicia o jogo
    if (availableParticipants.length === 0) {
        resetGame(); // Reinicia o jogo
        return;
    }

    // Escolhe um nome aleatório da lista de participantes disponíveis
    const randomIndex = Math.floor(Math.random() * availableParticipants.length);
    const selectedPerson = availableParticipants[randomIndex];

    // Exibe o nome sorteado
    result.textContent = `${participants[currentTurn].name} sorteou: ${selectedPerson.name}`;
    revealedNames.push(selectedPerson.name); // Marca o nome como sorteado

    // Agora, exibe a mesma imagem nos três slots, correspondendo à pessoa sorteada
    slots.forEach(slot => {
        slot.querySelector('img').src = selectedPerson.src; // Coloca a imagem da pessoa sorteada
    });

    applauseSound.play(); // Toca o som de aplausos

    // Exibe no console quem pegou quem
    console.log(`${participants[currentTurn].name} - sorteou - ${selectedPerson.name}`);

    // Mantém as imagens visíveis por 5 segundos antes de voltar ao estado padrão
    setTimeout(() => {
        slots.forEach(slot => {
            slot.querySelector('img').src = 'default.jpg'; // Coloca a imagem padrão
        });
        result.textContent = ''; // Limpa o resultado após as imagens voltarem para o default
        spinButton.disabled = false; // Habilita o botão de girar para o próximo jogador
    }, 5000); // Espera 5 segundos para retornar às imagens padrão

    // Exibe o nome da próxima pessoa da vez
    setTimeout(() => {
        currentTurn = (currentTurn + 1) % participants.length; // Avança para o próximo
        turnMessage.textContent = `Agora é a vez de ${participants[currentTurn].name}!`;
        currentPerson.textContent = participants[currentTurn].name; // Atualiza a pessoa da vez
        turnMessage.classList.remove('hidden');
        resetButton.classList.remove('hidden'); // Mostra o botão de reinício
    }, 5000); // Exibe a próxima pessoa após 5 segundos

    spinButton.disabled = false;
}

// Função para reiniciar o jogo
function resetGame() {
    revealedNames = [];
    currentTurn = 0;
    result.textContent = '';
    turnMessage.textContent = `Agora é a vez de ${participants[currentTurn].name}!`;
    resetButton.classList.add('hidden'); // Esconde o botão de reinício
    turnMessage.classList.remove('hidden'); // Exibe a mensagem da vez
    currentPerson.textContent = participants[currentTurn].name;

    // Reseta as imagens dos slots
    slots.forEach(slot => {
        slot.querySelector('img').src = 'default.jpg'; // Coloca uma imagem padrão
    });
}

// Inicializa o jogo
currentPerson.textContent = participants[currentTurn].name;
turnMessage.textContent = `Agora é a vez de ${participants[currentTurn].name}!`;