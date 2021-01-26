const models = require('../models');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const sanitizeHtml = require('sanitize-html');
const config = require('../config/config.json');

//Création d'une publication
exports.createPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.development.secret);
    const userId = decodedToken.id;

    const postObject = req.body;

    let cleanPost = sanitizeHtml(postObject.content, {
        allowedTags: [],
        allowedAttributes: {}
    })

    if (cleanPost.length == 0) {
        res.status(400).json({ message: 'Format non valide' })
    } else {
        models.Post.create({ avatar: postObject.avatar, title: postObject.title, content: cleanPost, UserId: userId, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` })
            .then(() => { res.status(201).json({ message: cleanPost }) })
            .catch(error => res.status(400).json({ error }));
    }
}

//Affichage de toutes les publications
exports.getAllPosts = (req, res) => {
    models.Post.findAll({
        include: [{
            model: models.User,
            attributes: ['firstName']
        }],
        order: [
            ['updatedAt', 'DESC'],
        ],
    })
        .then(posts => { return res.status(200).send(posts) })
        .catch(error => res.status(400).json({ error }));
}

//Affichage d'une publication
exports.getPost = (req, res) => {
    models.Post.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: models.User,
            attributes: ['firstName', 'id']
        }]
    })
        .then(post => { res.status(200).json(post) })
        .catch(error => res.status(400).json({ error }))
}

//Affichage des publications d'un utilisateur
exports.getUserPosts = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.development.secret);
    const userId = decodedToken.id;

    models.Post.findAll({
        where: {
            userId: userId
        },
        include: [{
            model: models.User,
            attributes: ['firstName', 'id']
        }],
        order: [
            ['updatedAt', 'DESC'],
        ],
    })
        .then(post => { res.status(200).json(post) })
        .catch(error => res.status(400).json({ error }))
}

//Modification d'une publication
exports.modifyPost = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.development.secret);
    const userId = decodedToken.id;

    const postReq = req.body;

    let cleanPost = sanitizeHtml(postReq.content, {
        allowedTags: [],
        allowedAttributes: {}
    })

    if (cleanPost.length == 0) {
        res.status(400).json({ message: 'Format non valide' })
    } else {
        let post = await models.Post.findOne({ where: { id: req.params.id } })

        if (post.userId = userId) {
            const postObject = req.file ?  { imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, title: postReq.title, content: cleanPost } : { ...req.body };

            models.Post.update({ ...postObject }, { where: { id: req.params.id } })
                .then(() => { res.status(201).json({ postObject }) })
                .catch(error => res.status(400).json({ error }));
        }
    }
};

//Suppression d'une publication
exports.deletePost = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.development.secret);
    const userId = decodedToken.id;

    const post = await models.Post.findOne({ where: { id: req.params.id } })

    if (post.userId = userId) {
        models.Comment.destroy({ where: { postId: req.params.id } })
        const postFilename = post.imageUrl.split('/images/')[1]
        fs.unlink(`images/${postFilename}`, () => {
            post.destroy()
                .then(() => res.status(200).json({ message: 'Publication supprimée !' }))
                .catch(error => res.status(400).json({ error }));
        });
    }
};