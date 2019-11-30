let express = require('express');
let route = express.Router();
var mongoose = require('mongoose');
var test = require('../models/test');

route.get("/", function(req, res) {
    mongoose.connect("mongodb+srv://dropert:SXlUQZIM1vQfImm2@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority", {useNewUrlParser:true, useUnifiedTopology: true}, function (err) {
        if (err) {
            res.statusMessage = "Connexion BDD impossible";
            return res.status(500).end();
        }
    });
});

route.post("/", function (req, res) {
    mongoose.connect("mongodb+srv://dropert:SXlUQZIM1vQfImm2@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority", {useNewUrlParser:true, useUnifiedTopology: true}, function (err) {
        if (err)
            return res.status(500).json({message: "Connexion BDD impossible"});
        else {
            var idprojet = req.body.idprojet;
            var given = req.body.given;
            var when = req.body.when;
            var then = req.body.then;
            var test = new test.testModel({IDProjet: idprojet, testGiven: given, testWhen: when, testThen: then});
            test.save(function (err) {
                if (err) {
                    res.statusMessage = "Échec de la création du test";
                    mongoose.connection.close();
                    return res.status(500).end();
                }else {
                    mongoose.connection.close();
                    res.statusMessage = "Création du test réussie";
                    return res.status(201).end();
                }
            });
        }
    });
});

module.exports = route;