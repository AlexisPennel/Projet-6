const User = require('../models/user');

exports.createUser = (req, res, next) => {
    const user = new User({
     ...req.body
    });
    console.log(user);
    user.save()
     .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
     .catch(error => res.status(400).json({ error }));
 };

 exports.login = (req, res, next) => {
    console.log(req.body);
    res.status(200).json({
        message: `Utilisateur ${req.body.email} connecté`
    });
};