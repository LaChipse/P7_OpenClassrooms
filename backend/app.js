// Initialisation de dotenv
require('dotenv').config()

// Initialisation des dépendances
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');

// Récupération des routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

//Initialisation de l'application avec le framework express
const app = express();


// Connection à la database
require("./db_connection");

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


// Utilisation du body-parser pour les content-type : application/json
app.use(bodyParser.json());
app.use(helmet());


// Utilisation du path pour enregistrer les images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Utilisation des routes 
app.use('/api', userRoutes);
app.use('/api/posts', postRoutes);



// Export de app pour le fichier server.js
module.exports = app;