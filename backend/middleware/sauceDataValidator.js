const fs = require('fs');

const sauceDataValidator = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    console.log(sauceObject)
  if ( sauceObject.heat > 10 ) {
        res.status(400).json({ message: 'valeur invalide'});
        return
    }
    next()
};

module.exports = sauceDataValidator; 