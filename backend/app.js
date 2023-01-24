const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config();
const helmet = require('helmet');

const authRoutes = require('./routes/auth');
const saucesRoutes = require('./routes/sauces');

mongoose.set('strictQuery', true);

// Création app express et connexion MongoDB
const app = express();
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Package helmet
app.use(helmet());

// Prise en charge JSON
app.use(express.json());

// Headers pour permettre des requêtes cross-origin  
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Endpoints
app.use('/api/auth', authRoutes);

app.use('/api/sauces', saucesRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;