const express = require('express');
const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, saucesCtrl.getSauces);

router.get('/:id', auth, saucesCtrl.getOneSauce);

router.post('/', auth, saucesCtrl.createSauce);

router.put('/:id', auth, saucesCtrl.updateSauce);

router.delete('/:id', auth,  saucesCtrl.deleteSauce);

module.exports = router;