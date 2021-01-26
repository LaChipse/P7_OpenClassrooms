//Importations
const models = require('../models');
const jwt = require('jsonwebtoken');
const sanitizeHtml = require('sanitize-html');
const config = require('../config/config.json');
const { sequelize } = require('../models');

//Création d'un commentaire
exports.createComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.development.secret);
    const userId = decodedToken.id;

    const postObject = req.body;

    let cleanComment = sanitizeHtml(postObject.content, {
        allowedTags: [],
        allowedAttributes: {}
    })

    if (cleanComment.length == 0) {
        res.status(400).json({ message: 'Format non valide' })
    } else {
        models.Comment.create({ content: cleanComment, UserId: userId, PostId: req.params.id })
            .then(() => { res.status(201).json({ message: cleanComment }) })
            .catch(error => res.status(400).json({ error }));
    }
}

//Récupération des commentaires d'un post
exports.getComment = (req, res) => {
    models.Comment.findAll({
        where: { postId: req.params.id },
        include: [{
            model: models.User,
            attributes: ['firstName', 'lastName', 'imageUrl']
        }], order: [
            ['updatedAt', 'DESC'],
        ],
    })
        .then(comment => { res.status(200).json(comment); })
        .catch((error) => { res.status(400).json({ error }) });
}

//Modification d'un commentaire
exports.modifyComment = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.development.secret);
    const userId = decodedToken.id;

    const postObject = req.body;

    let cleanComment = sanitizeHtml(postObject.content, {
        allowedTags: [],
        allowedAttributes: {}
    })
    if (cleanComment.length == 0) {
        res.status(400).json({ message: 'Format non valide' })
    } else {

        let comment = await models.Comment.findOne({ where: { id: req.params.id } })

        if (comment.UserId == userId) {
            models.Comment.update({ content: cleanComment }, { where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Commentaire modifié !' }))
                .catch(error => res.status(400).json({ error }));
        }
    }
};

//Suppression d'un commentaire
exports.deleteComment = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.development.secret);
    const userId = decodedToken.id;

    const comment = await models.Comment.findOne({ where: { id: req.params.id } })

    if (comment.UserId == userId) {
        models.Comment.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
            .catch(error => res.status(400).json({ error }));
    }
};