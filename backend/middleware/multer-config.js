//Importation
const multer = require('multer');

//Dictionnaire MIME_TYPES
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'image/gif': 'gif'
};

//Objet de configuration pour Multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const ext = MIME_TYPES[file.mimetype];
    if (ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg'  && ext !== 'gif') {
      return callback('Only images are allowed')
    } else {
    callback(null, name + Date.now() + '.' + ext);
  }}
});

//Exportation
module.exports = multer({storage: storage}).single('image');