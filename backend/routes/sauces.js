const express = require('express');
const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const { sauceDataValidatorPost, sauceDataValidatorPut} = require("../middleware/sauceDataValidator")
const router = express.Router();

router.get('/', auth, multer, saucesCtrl.getSauces);

router.get('/:id', auth, multer, saucesCtrl.getOneSauce);

router.post('/', auth, multer, sauceDataValidatorPost, saucesCtrl.createSauce);

router.put('/:id', auth, multer, sauceDataValidatorPut, saucesCtrl.updateSauce);

router.delete('/:id', auth, multer, saucesCtrl.deleteSauce);

router.post('/:id/like', auth, saucesCtrl.likeSauce)

module.exports = router;