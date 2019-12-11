let express = require("express");
let route = express.Router();
let mongoose = require("mongoose");
let task = require("../../model/task");
let project = require("../../model/project");

const stringConnect = "mongodb+srv://dropert:SXlUQZIM1vQfImm2@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority";
const errorConnect = "Connexion BDD impossible";

route.get("/", function (req, res) {
  return mongoose.connect(stringConnect, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
      res.statusMessage = errorConnect;
      return res.status(500).end();
    } else {
      task.taskModel.find({"Projet._id": mongoose.Types.ObjectId(req.query.id)}).lean().exec(function (err, docs){
        if (err) {
          console.log(err);
          res.statusMessage = "Échec récupération tâches";
          return res.status(500).end();
        } else 
          return res.end(JSON.stringify(docs));
      });
    }
  });
});

route.post("/", function (req, res) {
  return mongoose.connect(stringConnect, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err)
      return res.status(500).json({ message: errorConnect });
    else {
      const id = req.body.id;
      const titre = req.body.titre;
      const description = req.body.description;
      const statut = req.body.statut;
      project.projectModel.findOne({_id:id}, function(err, doc){
        if(err){
          res.statusMessage = "Erreur de récupération du projet";
          mongoose.connection.close();
          return res.status(500).end();
        }else{
          let newTask = new task.taskModel({ Projet: doc, Titre: titre, Description: description, Statut: statut });
          newTask.save(function (err) {
            if (err) {
              res.statusMessage = "Échec de la création de la tâche";
              mongoose.connection.close();
              return res.status(500).end();
            } else {
              mongoose.connection.close();
              res.statusMessage = "Création de la tâche réussie";
              return res.status(201).end();
            }
          });
        }
      });
    }
  });
});

route.put("/", function (req, res) {
  return mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology:true}, function (err) {
    if (err) {
      res.statusMessage = errorConnect;
      return res.status(500).end();
    }else {
      task.taskModel.findOne({_id:req.body.id}, function (err) {
        if (err) {
          mongoose.connection.close();
          res.statusMessage = "Echec vérification id projet";
          return res.status(500).end();
        }else{
          const titre = req.body.titre;
          const description = req.body.description;
          const statut = req.body.statut;
          task.taskModel.update({_id:req.body.id},
            {
              Titre : titre,
              Description : description,
              Statut : statut
            }, function (err, result) {
              if (err) {
                mongoose.connection.close();
                res.statusMessage = "Echec de la mise à jour de la tâche";
                return res.status(500).end();
              }else {
                mongoose.connection.close();
                return res.status(200).end();
              }
            });
        }
      });
    }
  });
});

route.delete("/", function (req, res) {
  return mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology:true}, function (err) {
    if (err)
      return res.status(500).json({message: errorConnect});
    else {
      const id = req.body.id;
      task.taskModel.findByIdAndRemove(id, function (err) {
        if (err) {
          res.statusMessage = "Echec de la suppresion de la tâche";
          mongoose.connection.close();
          return res.status(500).end();
        }else {
          mongoose.connection.close();
          res.statusMessage = "Suppression de la tâche réussie";
          return res.status(200).end();
        }
      });
    }
  });
});

module.exports = route;