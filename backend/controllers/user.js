const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const fs = require('fs');
const config = require('../config/config.json');

//Création d'un utilisateur
exports.signup = (req, res, next) => {

    const userObject = req.body;

    models.User.findOne({ where: { email: userObject.email.toLowerCase() } })
        .then(findUser => {
            if (findUser) {
                return res.status(401).json({ message: 'Cet utilisateur est déjà enregistré' });
            } else {
                bcrypt.hash(userObject.password, 10)
                    .then((hash) => {
                        models.User.create({ ...userObject, email: userObject.email.toLowerCase(), password: hash })
                            .then(() => { res.status(201).send({ message: 'Profil enregistré !' }) })
                            .catch(error => res.status(400).json({ error }));
                    })
                    .catch(error => res.status(500).json({ error }));
            }
        })
}

//Connexion utilisateur
exports.login = (req, res, next) => {
    const userObject = req.body;

    models.User.findOne({ where: { email: userObject.email } })
        .then(user => {
            if (!user) {
                return res.status(400).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(userObject.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(400).json({ error: 'Mot de passe incorrect !' });
                    }
                    return res.status(200).json({ userId: user.id, token: jwt.sign({ id: user.id }, config.development.secret, { expiresIn: '24h' }) });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//Affichage d'un profil
exports.getUser = (req, res, next) => {

    models.User.findOne({
        where: { id: req.params.id },
        include: [{ model: models.Post }]
    })
        .then((user) => { res.status(200).json(user) })
        .catch((error) => {
            res.status(400).json({ error: error });
        }
        )
};

//Modifier photo de profil
exports.updateUser = async (req, res, next) => {

    user = await models.User.findOne({ where: { id: req.params.id } })
    const filename = user.imageUrl.split('/images/')[1]
    fs.unlink(`images/${filename}`, () => {

        const userObject = req.file ? { imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` } : { ...req.body };

        models.User.update({ ...userObject }, { where: { id: req.params.id } })
            .then(() => { res.status(201).json({ userObject }) })
            .catch(error => res.status(400).json({ error }));
    })
}

//Suppression du profil
exports.deleteUser = async (req, res) => {

    await models.Comment.destroy({ where: { userId: req.params.id } })

    const posts = await models.Post.findAll({ where: { userId: req.params.id } })
    posts.forEach(post => {
        const postFilename = post.imageUrl.split('/images/')[1]
        fs.unlink(`images/${postFilename}`, () => {
            post.destroy()
                .then(() => { res.status(200).json({ message: 'Posts supprimés !' }) })
                .catch(error => res.status(500).json({ error }));
        })
    })

    const user = await models.User.findOne({ where: { id: req.params.id } })
    const filename = user.imageUrl.split('/images/')[1]
    fs.unlink(`images/${filename}`, () => {
        user.destroy()
            .then(() => { res.status(200).json({ message: 'Profil supprimé !' }) })
            .catch(error => res.status(400).json({ error }));
    })
}