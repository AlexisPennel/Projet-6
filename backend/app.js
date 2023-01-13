const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const app = express();
mongoose.connect('mongodb+srv://AlexP:1234@clusterp6.w6swi9g.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/auth/signup', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: `Utilisateur ${req.body.email} ajouté !`
    });
});

app.post('/api/auth/login', (req, res, next) => {
    res.status(201).json({
        message: 'Utilisateur connecté'
    });
});

app.get('/api/sauces', (req, res, next) => {
    res.status(200).json({
        message: 'Tableau de sauces'
    });
});

app.get('/api/sauces/:id', (req, res, next) => {
    res.status(200).json({
        message: `Sauce avec l'id fourni`
    });
});

app.post('/api/sauces', (req, res, next) => {
    res.status(201).json({
        message: `Création d'une sauce`
    });
});

app.put('/api/sauces/:id', (req, res, next) => {
    res.status(201).json({
        message: `Maj de la sauce avec l'id fourni`
    });
});

app.delete('/api/sauces/:id', (req, res, next) => {
    res.status(200).json({
        message: `Sauce avec l'id fourni supprimée`
    });
});

module.exports = app;