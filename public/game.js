const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let personagem = {
    x: 50, 
    y: 265, // Ajustei a altura do personagem
    width: 150, 
    height: 150,
    img: new Image()
};

personagem.img.src = localStorage.getItem("personagem") === "p1" 
    ? "assets/personagem1.png" 
    : "assets/personagem2.png";

let porta = {
    x: 700, 
    y: 200, // Ajustei a posição da porta para cima
    width: 120,  
    height: 250, // Ajustei para a porta ficar mais proporcional
    imgFechada: new Image(),
    imgAberta: new Image(),
    aberta: false
};

porta.imgFechada.src = "assets/porta-fechada.png";
porta.imgAberta.src = "assets/porta-aberta.png";

/* Função para desenhar o jogo */
function desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Se o personagem estiver perto, troca para a porta aberta
    let distancia = porta.x - (personagem.x + personagem.width);
    let imagemPorta = distancia < 30 || porta.aberta ? porta.imgAberta : porta.imgFechada;

    ctx.drawImage(personagem.img, personagem.x, personagem.y, personagem.width, personagem.height);
    ctx.drawImage(imagemPorta, porta.x, porta.y, porta.width, porta.height);
}

/* Movimento do personagem */
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        let distancia = porta.x - (personagem.x + personagem.width);

        if (distancia > 10 || porta.aberta) { 
            personagem.x += 15;
        } else if (!porta.aberta) {
            abrirMemoria();
        }
    }
    if (e.key === "ArrowLeft" && personagem.x > 0) personagem.x -= 15;
    desenhar();
});

/* Abrir jogo da memória */
function abrirMemoria() {
    document.getElementById("memoriaModal").style.display = "block";
}

/* Fechar jogo da memória e abrir a porta */
function fecharMemoria() {
    porta.aberta = true;  
    document.getElementById("memoriaModal").style.display = "none";
    desenhar();
}

const muteBtn = document.getElementById("mute-btn");

muteBtn.addEventListener("click", () => {
    if (musica.muted) {
        musica.muted = false;
        muteBtn.textContent = "🔊 Som Ligado";
    } else {
        musica.muted = true;
        muteBtn.textContent = "🔇 Som Desligado";
    }
});
 
// Criar um elemento de áudio para a música de fundo
const musica = new Audio("assets/musica.mp3");
musica.loop = true; // Repetir a música
musica.volume = 0.5; // Ajuste de volume

// Iniciar a música quando o jogo carregar
window.addEventListener("load", () => {
    musica.play().catch(error => console.log("Erro ao iniciar áudio:", error));
});
 

/* Inicializa o jogo */
desenhar();
