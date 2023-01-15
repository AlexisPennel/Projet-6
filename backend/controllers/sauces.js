const Sauces = require('../models/Sauces');

exports.getSauces = (req, res, next) => {
    res.status(200).json({
        message: 'Tableau de sauces'
    });
};

exports.getOneSauce = (req, res, next) => {
    res.status(200).json({
        message: `Sauce avec l'id fourni`
    });
};

exports.createSauce = (req, res, next) => {
    res.status(201).json({
        message: `Création d'une sauce`
    });
};

exports.updateSauce = (req, res, next) => {
    res.status(201).json({
        message: `Maj de la sauce avec l'id fourni`
    });
};

exports.deleteSauce = (req, res, next) => {
    res.status(200).json({
        message: `Sauce avec l'id fourni supprimée`
    });
};