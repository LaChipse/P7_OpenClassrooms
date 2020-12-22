//Importations
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
 
//Routes User
router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/', auth, userCtrl.getUser);
router.put('/', auth, multer, userCtrl.updateUser);
router.delete('/',auth, userCtrl.deleteUser);

//Exportation
module.exports = router;
