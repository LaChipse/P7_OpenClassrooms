const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Création d'un utilisateur dans la bdd
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.create({
                firstName : req.body.firstName,
                lastName: req.body.lastName,
                pseudo: red.body.pseudo,
                email: req.body.email,
                password: hash,
                role: 2
            })
            .then(() => res.status(201).json({message: 'Utilisateur crée !'}))
            .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
}

// Envoi et vérification de l'entrée utilisateur pour se connecter
exports.login = (req, res, next) => {
    User.findAll({ where: { email: req.body.email }})
        .then(user => {
            if (user[0] === undefined){
                return res.status(404).json({error: "Utilisateur non trouvé"});
            } 
            bcrypt.compare(req.body.password, user[0].password)
                .then(valid => {
                    if (!valid){
                        return res.status(401).json({error: 'Mot de passe incorrect !'});
                    }
                    res.status(200).json({
                        userId: user[0].userId,
                        token: jwt.sign(
                            { userId: user[0].userId, role: user[0].role },
                            process.env.SECRET_KEY,
                            { expiresIn: '24h'}
                        )
                    });
                }) 
                .catch(error => res.status(500).json({error}))   
        })
        .catch(error => res.status(400).json({error}));
}


// Récupération d'un seul utilisateur dans la table Users
exports.getOneUser = (req, res, next) => {
    User.findAll({where : { userId: req.params.id }})
    .then(user => {res.status(200).json(user)})
    .catch(error => res.status(404).json({error}));
}

// Suppression d'un utilisateur de la base de données
exports.deleteOneUser = (req, res, next) => {
    User.destroy({where : { userId: req.params.id }})
    .then(() => res.status(200).json({message: 'Utilisateur supprimé'}))
    .catch(error => res.status(400).json({error}));
}

// Modification d'un utilisateur de la base de données
exports.modifyUser = (req, res, next) => {
    const userObject = req.file ?
        {
            ...req.body.userId,
            avatar: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        } : { ... req.body}
    User.update({ ...userObject, id:  req.params.id}, { where: { id: req.params.id }})
      .then(() => res.status(200).json({ ...userObject }))
      .catch(error => res.status(400).json({ error }))
}