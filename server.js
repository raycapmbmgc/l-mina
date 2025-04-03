const express = require("express");
const app = express();
const path = require("path");

app.use(express.static("public")); // Servir arquivos estáticos (HTML, CSS, JS)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/select", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "select.html"));
});

app.get("/game", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "game.html"));
});


const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
