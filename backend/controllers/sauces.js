const Sauces = require('../models/Sauces');
const fs = require('fs');

exports.getSauces = (req, res, next) => {
    Sauces.find()
        .then(Sauces => res.status(200).json(Sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
        .then(Sauces => res.status(200).json(Sauces))
        .catch(error => res.status(404).json({ message: `la sauce n'existe pas` }));
};

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    delete sauceObject.likes;
    delete sauceObject.dislikes;
    delete sauceObject.usersLiked;
    delete sauceObject.usersDisliked;

    const sauce = new Sauces({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
        .then(() => { res.status(201).json({ message: 'sauce enregistrée' }) })
        .catch(error => { res.status(400).json({ error }) })
};

exports.updateSauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete sauceObject._userId;
    Sauces.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non authorisé' });
                return
            }

            if (req.file) {
                const filename = sauce.imageUrl.split('/images/')[1];
                console.log(filename);
                fs.unlink(`images/${filename}`, (err) => {
                    if (err) throw err;
                });
            }

            Sauces.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                .catch(error => res.status(401).json({ error }));

        })
        .catch((error) => {
            res.status(404).json({ message: `La sauce n'existe pas`});
        });
};

exports.deleteSauce = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non authorisé' });
                return
            }
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauces.deleteOne({ _id: req.params.id })
                    .then(() => { res.status(204).json() })
                    .catch(error => res.status(401).json({ error }));
            });

        })
        .catch(error => {
            res.status(404).json({ message: 'Sauce introuvable' });
        })
};

exports.likeSauce = (req, res, next) => {

    Sauces.findOne({ _id: req.params.id })
        .then(sauce => {

            const userIdInLikes = sauce.usersLiked.find(element => element === req.body.userId);
            const userIdInDislikes = sauce.usersDisliked.find(element => element === req.body.userId);

            if (req.body.like === 1) {
                if (userIdInDislikes) {
                    sauce.usersDisliked.splice(userIdInDislikes, 1);
                    sauce.dislikes--;
                }

                if (userIdInLikes) {
                    res.status(400).json({ message: "Sauce déjà likée" });
                    return
                }
                sauce.usersLiked.push(req.body.userId);
                sauce.likes++;
                sauce.save()
                    .then(sauce => {
                        res.status(200).json({ message: 'Like ajouté !' });
                        return
                    })
                    .catch(error => res.status(500).json({ message: 'erreur' }));

            }


            if (req.body.like === 0) {
                if (userIdInLikes) {
                    sauce.usersLiked.splice(userIdInLikes, 1);
                    sauce.likes--;
                }

                if (userIdInDislikes) {
                    sauce.usersDisliked.splice(userIdInDislikes, 1);
                    sauce.dislikes--;
                }

                sauce.save()
                    .then(sauce => {
                        res.status(200).json({ message: 'Like annulé' });
                        return
                    })
                    .catch(error => res.status((500).json({ error })));
            }

            if (req.body.like === -1) {

                if (userIdInLikes) {
                    sauce.usersLiked.splice(userIdInLikes, 1);
                    sauce.likes--;
                }

                if (userIdInDislikes) {
                    res.status(400).json({ message: "Sauce déjà dislikée" });
                    return
                }

                sauce.usersDisliked.push(req.body.userId);
                sauce.dislikes++;
                sauce.save()
                    .then(sauce => {
                        res.status(200).json({ message: 'Dislike ajouté' });
                        return
                    })
                    .catch(error => res.status(500).json({ error }));

            }
            
            if (req.body.like < -1 || req.body.like > 1) {
                res.status(400).json({ message: "requête erronée " });
            }

        })
        .catch(error => res.status(404).json({ message: "La sauce n'existe pas" }));
};