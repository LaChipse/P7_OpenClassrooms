//Importations
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');

//Routes Comment
router.post('/:id', auth, commentCtrl.createComment);
router.get('/:id', auth, commentCtrl.getComments);
router.put('/:id', auth, commentCtrl.modifyComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

//Exportation
module.exports = router;