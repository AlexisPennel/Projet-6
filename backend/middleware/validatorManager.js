const { body, validationResult } = require('express-validator');

const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};

const bodyLoginValidator = [
    body("email", "Format de l'email incorrect").trim().isEmail().normalizeEmail(),
    body("password", "Le mot de passe doit avoir au moins 8 caractères, contenir au moins une majuscule , un chiffre et un caractère spécial").trim().isStrongPassword(),
    validationResultExpress,
];

const bodyRegisterValidator = [
    body("email", "Format de l'email incorrect").trim().isEmail().normalizeEmail(),
    body("password", "Le mot de passe doit avoir au moins 8 caractères, contenir au moins une majuscule , un chiffre et un caractère spécial").trim().isStrongPassword(),
    validationResultExpress,
];

module.exports = { bodyLoginValidator, bodyRegisterValidator, validationResultExpress };