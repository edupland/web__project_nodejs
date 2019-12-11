let express = require("express");
let route = express.Router();
let mongoose = require("mongoose");
let test = require("../../model/test");
let project = require("../../model/project");

const stringConnect = "mongodb+srv://dropert:SXlUQZIM1vQfImm2@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority";
const errorConnect = "Connexion BDD impossible";

route.get("/", function (req, res) {
    return mongoose.connect(stringConnect, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
        if (err) {
            res.statusMessage = errorConnect;
            return res.status(500).end();
        } else {
            test.testModel.find({ "Projet._id": mongoose.Types.ObjectId(req.query.id)}).lean().exec(function (err, docs) {
                if (err) {
                    console.log(err);
                    res.statusMessage = "Échec récupération tests";
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
            const given = req.body.testGiven;
            const when = req.body.testWhen;
            const then = req.body.testThen;
            project.projectModel.findOne({_id:id}, function(err, doc){
                if(err){
                    res.statusMessage = "Erreur de récupération du projet";
                    mongoose.connection.close();
                    return res.status(500).end();
                }else{
                    let newTest = new test.testModel({ Projet: doc, TestGiven: given, TestWhen: when, TestThen: then });
                    newTest.save(function (err) {
                        if (err) {
                            res.statusMessage = "Échec de la création du test";
                            mongoose.connection.close();
                            return res.status(500).end();
                        } else {
                            mongoose.connection.close();
                            res.statusMessage = "Création du test réussie";
                            return res.status(201).end();
                        }
                    });
                }
            });
        }
    });
});

route.put("/", function (req, res) {
    return mongoose.connect(stringConnect, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
        if (err) {
            res.statusMessage = errorConnect;
            return res.status(500).end();
        } else {
            test.testModel.findOne({ _id: req.body.id }, function (err) {
                if (err) {
                    mongoose.connection.close();
                    res.statusMessage = "Echec vérification id projet";
                    return res.status(500).end();
                } else {
                    const testgiven = req.body.testgiven;
                    const testwhen = req.body.testwhen;
                    const testthen = req.body.testthen;
                    test.testModel.update({ _id: req.body.id },
                        {
                            testGiven: testgiven,
                            testWhen: testwhen,
                            testThen: testthen
                        }, function (err) {
                            if (err) {
                                mongoose.connection.close();
                                res.statusMessage = "Echec de la mise à jour du test";
                                return res.status(500).end();
                            } else {
                                mongoose.connection.close();
                                return res.status(200).end();
                            }
                        });
                }
            });
        }
    });
});

module.exports = route;