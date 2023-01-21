const { body, validationResult } = require('express-validator');

const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};

const bodyLoginValidator = [
    body("email", "Format de l'email incorrect")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Minimum 6 carractères").trim().isLength({ min: 6 }),
    validationResultExpress,
];

const bodyRegisterValidator = [
    body("email", "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
    validationResultExpress,
];

module.exports = {bodyLoginValidator, bodyRegisterValidator, validationResultExpress}