//Importations
const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");

//Importations des routes
const userRoutes = require('./routes/user');
const userPosts = require('./routes/post');
const userComment = require('./routes/comment');

//Création de l'app express
const app = express();

//Authorisations requetes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Gestion données reçues
app.use(bodyParser.json());

const db = require("./models")
db.sequelize.sync()

//Gestion images de manière statique
app.use('/images', express.static(path.join(__dirname, 'images')));

//Routeurs à utiliser
app.use('/api/user', userRoutes);
app.use('/api/post', userPosts);
app.use('/api/comment', userComment);

// SECURITY
// Protection contre certaines vulnérabilités Web bien connues en définissant les en-têtes HTTP de manière appropriée.
var helmet = require('helmet');
app.use(helmet());

module.exports = app;