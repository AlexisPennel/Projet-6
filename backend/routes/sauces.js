const express = require('express');
const router = express.Router();
const saucesCtrl = require('../controllers/sauces')

router.get('/', saucesCtrl.getSauces);

router.get('/:id', saucesCtrl.getOneSauce);

router.post('/', saucesCtrl.createSauce);

router.put('/:id', saucesCtrl.updateSauce);

router.delete('/:id', saucesCtrl.deleteSauce);

module.exports = router;