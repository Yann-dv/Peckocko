// Ajouter express au projet avec npm install --save express
// Ajouter database mongoDB : npm install --save mongoose
require('dotenv').config();

const express = require('express');
const helmet = require("helmet");
const bodyParser = require('body-parser'); //npm install --save body-parser
const mongoose = require('mongoose');
const path = require('path');

const sauceRoutes = require ('./routes/sauce');
const userRoutes = require ('./routes/user');
const { error } = require('console');
const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASS}@cluster0.inh05rr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(connectionString,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion to MongoDB succeed !'))
  .catch(error => console.log('Connexion to MongoDB failed !', error.message));

const app = express();


app.use((req, res, next) => { // middleware permettant l'accès à l'api, contournant la sécurité par défaut CORS
    res.setHeader('Access-Control-Allow-Origin', '*'); // accès toutes origines
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // headers autorisés
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // méthodes autorisées
    next();
  });
  
  app.use(helmet());

  app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images'))); // indique à express qu'il faut gérer la ressource images comme un dossier statique

app.use('/api/auth', userRoutes); // Authentification login et signup
app.use('/api/sauces', sauceRoutes); // Obtenir toutes les sauces

module.exports = app; // export pour utilisation par server