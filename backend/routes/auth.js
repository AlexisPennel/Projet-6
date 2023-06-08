const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');
const limiter = require('../middleware/loginLimiter');
const { bodyRegisterValidator, bodyLoginValidator } = require('../middleware/validatorManager');


router.post('/signup', limiter, bodyRegisterValidator, authCtrl.signUp);

router.post('/login', limiter, bodyLoginValidator, authCtrl.login);

module.exports = router;