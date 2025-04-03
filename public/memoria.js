const images = [
    "coração.png", "chave.png", "espada.png", "moeda.png",
    "coração.png", "chave.png", "espada.png", "moeda.png"
];

let shuffledImages = images.sort(() => Math.random() - 0.5);
let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0;

const memoriaGrid = document.querySelector(".memoria-grid");

// Criando as cartas dinamicamente
shuffledImages.forEach(img => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="front"></div>
        <div class="back"><img src="assets/${img}" alt="Imagem"></div>
    `;

    card.addEventListener("click", flipCard);
    memoriaGrid.appendChild(card);
});

function flipCard() {
    if (lockBoard || this === firstCard) return;
    this.classList.add("flip");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkMatch();
}

function checkMatch() {
    if (firstCard.innerHTML === secondCard.innerHTML) {
        matchedPairs++;
        firstCard = null;
        secondCard = null;

        if (matchedPairs === images.length / 2) {
            setTimeout(() => {
                showWinMessage(); // Exibe a mensagem estilizada na tela
            }, 500);
        }
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
            firstCard = null;
            secondCard = null;
            lockBoard = false;
        }, 1000);
    }
}

function showWinMessage() {
    // Fecha automaticamente o jogo da memória
    document.getElementById("memoriaModal").style.display = "none";

    const winScreen = document.createElement("div");
    winScreen.innerHTML = `
        <div class="win-animation">
            🎉✨ PARABÉNS! VOCÊ COMPLETOU O JOGO DA MEMÓRIA! ✨🎉
        </div>
        <button id="continue-to-riddle">Continuar para a charada</button>
    `;
    winScreen.classList.add("win-screen");
    
    document.body.appendChild(winScreen);

    // Adiciona evento para continuar para a charada
    document.getElementById("continue-to-riddle").addEventListener("click", () => {
        winScreen.remove();
        showRiddle(); // Chama a função para mostrar a charada
    });
}

function showRiddle() {
    const riddleScreen = document.createElement("div");
    riddleScreen.innerHTML = `
        <div class="riddle">
            <p>Sou luz que brilha, mas não posso ser vista,
            Um calor que aquece, mas não tem forma.
            Perdida no tempo, em sombras escondida,
            Busque-me com coragem, e a vida se transforma.
            O que sou eu?</p>
            <input type="text" id="riddle-answer" placeholder="Sua resposta aqui">
            <button id="submit-answer">Enviar</button>
        </div>
    `;
    riddleScreen.classList.add("riddle-screen");
    
    document.body.appendChild(riddleScreen);

    // Adiciona evento para verificar a resposta
    document.getElementById("submit-answer").addEventListener("click", () => {
        const answer = document.getElementById("riddle-answer").value.toLowerCase();
        if (answer === "chama") { // Resposta correta
            riddleScreen.remove();
            showCompletionMessage(); // Exibe a mensagem de conclusão do desafio
        } else {
            alert("Resposta errada! Tente novamente.");
        }
    });
}

function showCompletionMessage() {
    const completionScreen = document.createElement("div");
    completionScreen.innerHTML = `
        <div class="completion-animation">
            🎉✨ PARABÉNS! VOCÊ COMPLETOU O DESAFIO! ✨🎉
        </div>
        <button id="close-completion-screen">Ir para a próxima porta</button>
    `;
    completionScreen.classList.add("completion-screen");
    
    document.body.appendChild(completionScreen);

    // Adiciona evento para redirecionar ao clicar no botão
    document.getElementById("close-completion-screen").addEventListener("click", () => {
        completionScreen.remove(); // Remove a tela de conclusão
        window.location.href = "carta.html"; // Redireciona para a página carta.html
    });
}

  

