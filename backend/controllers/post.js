const models = require('../models');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const sanitizeHtml = require('sanitize-html');
const config = require('../config/config.json');

//Création d'une publication
exports.createPost =  (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    result = jwt.verify(token, config.secret);
    
    const postObject = JSON.parse(req.body.post);
    let cleanPost = sanitizeHtml(postObject.content,{
        allowedTags: [],
        allowedAttributes: {}
    })
    
    if (cleanPost.length == 0) {
        res.status(400).json({ message: 'Format non valide' })
    } else {
    models.Post.create({ ...postObject, content: cleanPost, userId: result.id, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` })
        .then(() => { res.status(201).json({ message: 'Publication enregistrée !' }) })
        .catch(error => res.status(400).json({ error }));
}}

//Affichage de toutes les publications
exports.getAllPosts = (req, res) => {
    models.Post.findAll({
            include: [{
                model: models.User,
                attributes: ['firstName']
            }]
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

exports.modifyPost = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    result = jwt.verify(token, config.secret);
  
    let post = await models.post.findOne({ where: { id: req.params.id } })
    
    if (post.userId == result.id) {
      models.post.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Commentaire modifié !'}))
        .catch(error => res.status(400).json({ error }));
    }
  };

//Suppression d'une publication
exports.deletePost = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    result = jwt.verify(token, config.secret);

    let post = await models.Post.findOne({ where: { id: req.params.id } })

    if (post.userId == result.id) {
        models.Comment.destroy({ where: { postId: req.params.id }})
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            post.destroy()
                .then(() => res.status(200).json({ message: 'Publication supprimée!' }))
                .catch(error => res.status(400).json({ error }));
        });
    }
};