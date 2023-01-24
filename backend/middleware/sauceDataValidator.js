const fs = require('fs');

const sauceDataValidator = (req, res, next) => {
    if (req.file) {
        const sauceObject = JSON.parse(req.body.sauce);

        if (sauceObject.heat > 10 || sauceObject.heat < 1) {
            res.status(400).json({ message: 'valeur invalide' });
            fs.unlink(`images/${req.file.filename}`, (err) => {
                if (err) throw err;
                console.log(`images/${req.file.filename} deleted`);
            });
            return
        }
    }

    if (!req.file) {
        if (req.body.heat > 10 || req.body.heat < 1) {
            res.status(400).json({ message: 'valeur invalide'});
            return
        }
    }

    next()
};

module.exports = sauceDataValidator; 