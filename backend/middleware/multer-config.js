const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {

    const name = file.originalname.split(' ').join('_');
    const fileName = name.split('.');
    fileName.splice(-1, 1);
    const newFileName = fileName.join(".");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, newFileName + Date.now() + '.' + extension);
  }
});

module.exports = multer({ storage: storage }).single('image');
