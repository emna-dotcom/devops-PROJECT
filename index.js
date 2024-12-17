const express = require('express');
const app = express();
const PORT = 3000;

// Route statique
app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API statique!');
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});