let express = require('express');
let route = express.Router();
var mongoose = require('mongoose');
var task = require('../models/task');

const stringConnect = "mongodb+srv://dropert:SXlUQZIM1vQfImm2@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority";
const errorConnect = "Connexion BDD impossible";

route.get("/", function (req, res) {
  mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology: true}, function (err) {
    if (err) {
      res.statusMessage = errorConnect;
      return res.status(500).end();
    }
  });
});

route.post("/", function (req, res) {
  mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology: true}, function (err) {
    if (err) 
      return res.status(500).json({message: errorConnect});
    else {
      var idprojet = req.body.idprojet;
      var titre = req.body.titre;
      var description = req.body.description;
      var statut = req.body.statut;
      var task = new task.taskModel({IDProjet: idprojet, Titre: titre, Description: description, Statut: statut});
      task.save(function (err) {
        if (err) {
          res.statusMessage = "Échec de la création de la tâche";
          mongoose.connection.close();
          return res.status(500).end();
        }else {
          mongoose.connection.close();
          res.statusMessage = "Création de la tâche réussie";
          return res.status(201).end();
        }
      });
    }
  });
});

module.exports = route;