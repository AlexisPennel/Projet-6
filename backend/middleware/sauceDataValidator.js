const fs = require('fs');

const sauceDataValidator = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);

    if (sauceObject.heat > 10 || sauceObject.heat < 1) {
        res.status(400).json({ message: 'valeur invalide' });
        fs.unlink(`images/${req.file.filename}`, (err) => {
            if (err) throw err;
            console.log(`images/${req.file.filename} deleted`);
        });
        return
    }
    
    next()
};

module.exports = sauceDataValidator; 