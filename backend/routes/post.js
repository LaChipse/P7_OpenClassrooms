/* Ce fichier contient la logique de nos routes sauce */

/* Importation framework Express qui permet de déployer rapidement nos API */
const express = require('express');
/* Création router grace à la méthode Router d'Express */
const router = express.Router();

/* Importation du middleware de protection des routes et le passons comme argument aux routes à protéger */
const auth = require('../middleware/auth');
/* Imporation middleware multer puis mise à jour dans routes POST et PUT */
const multer = require('../middleware/multer-config');

/* Importation controleur */
const postCtrl = require('../controllers/post');

/* requete pour récupérer toutes les sauces */
router.get('/', auth, postCtrl.getAllpost);
/* requete pour envoyer une sauce */
router.post('/', auth, multer, postCtrl.createPost);
/* requete pour récupérer une sauce dont l'identifiant est id*/
router.get('/:id', auth, postCtrl.getOnePost);
/* requete pour modifier une sauce */
router.put('/:id', auth, multer, postCtrl.modifyPost);
/* requete pour supprimer une sauce */
router.delete('/:id', auth, postCtrl.deletePost);
/* requete pour like ou dislike une sauce */
router.post('/:id/like', auth, postCtrl.likePost);

/* Exportation router, le rendant par là même disponible pour notre application Express */
module.exports = router;