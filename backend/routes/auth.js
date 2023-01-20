const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');
const limiter = require('../middleware/loginLimiter');
const { body } = require('express-validator');


router.post('/signup',
    limiter,
    [
        body('email', 'Email invalide')
            .trim()
            .isEmail()
            .normalizeEmail(),
        body('password', "Mot de passe incorrect")
            .trim()
            .isStrongPassword()
    ],
    authCtrl.signUp);

router.post('/login',
    limiter,
    authCtrl.login);

module.exports = router;