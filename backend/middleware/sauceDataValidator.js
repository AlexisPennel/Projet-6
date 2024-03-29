const fs = require('fs');

const dataCheck = (req, res) => {
    let sauceObject = req.body;

    if (req.file) {
        sauceObject = JSON.parse(req.body.sauce);
    }

    const errorsArray = [];
    let isValid = true;


    if (sauceObject.name.trim() === "") {
        errorsArray.push(" Name invalide");
        isValid = false
    };

    if (sauceObject.manufacturer.trim() === "") {
        errorsArray.push(" Manufacturer invalide");
        isValid = false
    };

    if (sauceObject.description.trim() === "") {
        errorsArray.push(" Description invalide");
        isValid = false
    };

    if (sauceObject.mainPepper.trim() === "") {
        errorsArray.push(" Main Pepper invalide");
        isValid = false
    };

    if (sauceObject.heat > 10 || sauceObject.heat < 1) {
        errorsArray.push(" Heat invalide (doit être compris entre 1 et 10)");
        isValid = false
    };

    if (!isValid && req.file) {
        fs.unlink(`images/${req.file.filename}`, (err) => {
            if (err) throw err;
            console.log(`images/${req.file.filename} deleted`)
        });
    }


    return errorsArray
};

const sauceDataValidatorPost = (req, res, next) => {

    if (!req.body.sauce || !req.file) {
        if (req.file) {
            fs.unlink(`images/${req.file.filename}`, (err) => {
                if (err) throw err;
                console.log(`images/${req.file.filename} deleted`)
            });
        }
        return res.status(400).json({ message: "requête erronée" })
    }

    try {
        JSON.parse(req.body.sauce);
    } catch (error) {
        fs.unlink(`images/${req.file.filename}`, (err) => {
            if (err) throw err;
            console.log(`images/${req.file.filename} deleted`)
        });
        return res.status(400).json({ message: "requête erronée" });
    }

    const dataErrorArray = dataCheck(req, res);
    if (dataErrorArray.length === 0) {
        return next()
    }

    res.status(400).json({ message: `${dataErrorArray}` });

};

const sauceDataValidatorPut = (req, res, next) => {
    if (!req.body) {
        if (req.file) {
            fs.unlink(`images/${req.file.filename}`, (err) => {
                if (err) throw err;
                console.log(`images/${req.file.filename} deleted`)
            });
        }
        return res.status(400).json({ message: "requête erronée" })
    }

    const dataErrorArray = dataCheck(req, res);
    if (dataErrorArray.length === 0) {
        return next()
    }

    res.status(400).json({ message: `${dataErrorArray}` });
}

module.exports = { sauceDataValidatorPost, sauceDataValidatorPut }; 