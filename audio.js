// Criar um elemento de áudio para a música de fundo
const musica = new Audio("assets/musica.mp3");
musica.loop = true; // Repetir a música
musica.volume = 0.5; // Ajuste de volume

// Recuperar o estado de mute e o tempo da música armazenados no localStorage
const musicaMutada = localStorage.getItem("musicaMutada") === "true";
const tempoMusica = localStorage.getItem("tempoMusica");

// Se a música estiver mutada, configurar o estado
musica.muted = musicaMutada;

// Se um tempo foi armazenado, continuar de onde a música parou
if (tempoMusica) {
    musica.currentTime = parseFloat(tempoMusica);
}

// Função para iniciar a música
function iniciarMusica() {
    if (musica.paused) {
        musica.play().catch(error => console.log("Erro ao iniciar áudio:", error));
    }
}

// Função para alternar o mute
function alternarMute() {
    musica.muted = !musica.muted;
    // Armazenar o estado do mute
    localStorage.setItem("musicaMutada", musica.muted);
}

// Salvar o tempo da música a cada atualização
musica.addEventListener("timeupdate", () => {
    localStorage.setItem("tempoMusica", musica.currentTime);
});

// Iniciar a música quando a página for carregada
window.addEventListener("load", () => {
    if (!musica.paused) {
        iniciarMusica();  // Iniciar a música quando a página carregar
    }
});
