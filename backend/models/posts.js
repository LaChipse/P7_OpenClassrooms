const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
});

/* Utilisation méthode Schéma de mongoose pour créations schéma de données contenant champs souhaités pour chaque sauce, 
indique leur type ainsi que leur caractère (obligatoire ou non) */
const Post = sequelize.define('Post', {
title: {
    type: DataTypes.STRING,
    allowNull: false
},
userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
},
content: { 
    type: DataTypes.STRING,
    allowNull: false
},
attachment: { 
    type: DataTypes.STRING
 },
likes: { 
    type: DataTypes.BIGINT, 
    default: 0 
},
dislikes: { 
    type: DataTypes.BIGINT, 
    default: 0 
},
comment: { 
    type: DataTypes.STRING, 
},
});

Post.sync()
.then(() => console.log('La table Post a été créée dans la base de donnée'))
.catch(error => console.error('Une erreur est survenue', error));

module.exports = Post;