const express = require('express');
const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();

router.get('/', auth, multer, saucesCtrl.getSauces);

router.get('/:id', auth, multer, saucesCtrl.getOneSauce);

router.post('/', auth, multer, saucesCtrl.createSauce);

router.put('/:id', auth, multer, saucesCtrl.updateSauce);

router.delete('/:id', auth, multer, saucesCtrl.deleteSauce);

module.exports = router;