const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');
const { body } = require('express-validator');


router.post('/signup', [
    body('email', 'Email invalide')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', "Mot de passe incorrect")
        .trim()
        .isStrongPassword()
],
    authCtrl.signUp);

router.post('/login', authCtrl.login);

module.exports = router;