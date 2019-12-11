let express = require("express");
let route = express.Router();
let mongoose = require("mongoose");
let project = require("../../model/project");
let user = require("../../model/user");

const stringConnect = "mongodb+srv://dropert:SXlUQZIM1vQfImm2@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority";
const errorConnect = "Connexion BDD impossible";

route.get("/proprietaire", function(req, res){
    return mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology: true}, function(err) {
        if (err) {
            res.statutMessage = errorConnect;
            return res.status(500).end();
        } else {
            project.projectModel.find({"Proprietaire.Login": req.query.login}).lean().exec(function (err, docs) {
                if (err) {
                    console.log(err);
                    res.statusMessage = "Echec récupération projets";
                    return res.status(500).end();
                } else
                    return res.status(200).end(JSON.stringify(docs));
            });
        }
    });
});

route.get("/developpeur", function(req, res){
    return mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology: true}, function(err) {
        if (err) {
            res.statutMessage = errorConnect;
            return res.status(500).end();
        } else {
            project.projectModel.find({"Developpeurs.Login": req.query.login}).lean().exec(function (err, docs) {
                if (err) {
                    console.log(err);
                    res.statusMessage = "Echec récupération projets";
                    return res.status(500).end();
                } else
                    return res.end(JSON.stringify(docs));
            });
        }
    });
});

route.get("/client", function(req, res){
    return mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology: true}, function(err) {
        if (err) {
            res.statutMessage = errorConnect;
            return res.status(500).end();
        } else {
            project.projectModel.find({"Clients.Login": req.query.login}).lean().exec(function (err, docs) {
                if (err) {
                    console.log(err);
                    res.statusMessage = "Echec récupération projets";
                    return res.status(500).end();
                } else
                    return res.end(JSON.stringify(docs));
            });
        }
    });
});

route.get("/id", function(req, res){
    return mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology: true}, function(err) {
        if (err) {
            res.statutMessage = errorConnect;
            return res.status(500).end();
        } else {
            project.projectModel.find({_id: req.query.id}).lean().exec(function (err, docs) {
                if (err) {
                    console.log(err);
                    res.statusMessage = "Echec récupération projet";
                    return res.status(500).end();
                } else
                    return res.end(JSON.stringify(docs));
            });
        }
    });
});

route.post("/", function (req, res) {
    return mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology: true}, function(err){
        if(err)
            return res.status(500).json({message: errorConnect});
        else{
            const login = req.body.login;
            user.userModel.findOne({Login: login}).lean().exec(function(err, docs){
                if(err){
                    res.statusMessage = "Echec récupération infos proprietaire";
                    return res.status(500).end();
                }else{
                    const proprietaire = new user.userModel(docs);
                    const titre = req.body.titre;
                    const description = req.body.description;
                    let newProject = new project.projectModel({Titre:titre, Description:description, Proprietaire:login});
                    newProject.Proprietaire = proprietaire;
                    newProject.save(function(err){
                        if(err){
                            console.log(err);
                            res.statusMessage = "Echec de la création du projet";
                            mongoose.connection.close();
                            return res.status(500).end();
                        }else{
                            mongoose.connection.close();
                            res.statusMessage = "Création du projet réussie";
                            return res.status(201).end();
                        }
                    });
                }
            });
        }
    });
});

route.delete("/", function (req, res) {
    return mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology: true}, function(err){
        if(err)
            return res.status(500).json({message: errorConnect});
        else{
            const id = req.body.id;
            project.projectModel.findByIdAndRemove(id, function(err){
                if(err){
                    res.statusMessage = "Echec de la suppression du projet";
                    mongoose.connection.close();
                    return res.status(500).end();
                }else{
                    mongoose.connection.close();
                    res.statusMessage = "Suppression du projet réussie";
                    return res.status(200).end();
                }
            });
        }
    });
});

route.delete("/developpeur", function (req, res) {
    return mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology: true}, function(err){
        if(err)
            return res.status(500).json({message: errorConnect});
        else{
            const id = req.body.id;
            project.projectModel.findOne({_id: id}, function(err, doc){
                if(err){
                    res.statusMessage = "Echec de la récupération du projet";
                    mongoose.connection.close();
                    return res.status(500).end();
                }else{
                    doc.Developpeurs.splice(doc.Developpeurs.indexOf(req.body.developpeur), 1);
                    doc.save(function(err){
                        if(err){
                            res.statusMessage = "Echec de suppression du développeur";
                            mongoose.connection.close();
                            return res.status(500).end();
                        }else{
                            res.statusMessage = "Développeur supprimé";
                            mongoose.connection.close();
                            return res.status(200).end();
                        }
                    });
                }
            });
        }
    });
});

route.delete("/client", function (req, res) {
    return mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology: true}, function(err){
        if(err)
            return res.status(500).json({message: errorConnect});
        else{
            const id = req.body.id;
            project.projectModel.findOne({_id: id}, function(err, doc){
                if(err){
                    res.statusMessage = "Echec de la récupération du projet";
                    mongoose.connection.close();
                    return res.status(500).end();
                }else{
                    doc.Clients.splice(doc.Clients.indexOf(req.body.client), 1);
                    doc.save(function(err){
                        if(err){
                            res.statusMessage = "Echec de suppression du client";
                            mongoose.connection.close();
                            return res.status(500).end();
                        }else{
                            res.statusMessage = "Client supprimé";
                            mongoose.connection.close();
                            return res.status(200).end();
                        }
                    });
                }
            });
        }
    });
});

route.put("/", function (req, res) {
    return mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology: true}, function(err){
        if(err) {
            res.statusMessage = errorConnect;
            return res.status(500).end();
        }else{
            project.projectModel.findOne({_id:req.body.id}, function(err, doc){
                if(err) {
                    mongoose.connection.close();
                    res.statusMessage = "Echec vérification id";
                    return res.status(500).end();
                }else{
                    const titre = req.body.titre;
                    const description = req.body.description;
                    project.projectModel.update({_id:req.body.id},
                        {
                            Titre : titre,
                            Description : description
                        }, function(err){
                        if(err){
                            mongoose.connection.close();
                            res.statusMessage = "Echec de la mise à jour du projet";
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

function checkRole(user, doc, res){
    if(doc.Clients.find(element => element.Login.localeCompare(user)===0) !== undefined) {
        mongoose.connection.close();
        res.statusMessage = "Ce compte est déjà un client";
        return false;
    }if(doc.Developpeurs.find(element => element.Login.localeCompare(user)===0) !== undefined) {
        mongoose.connection.close();
        res.statusMessage = "Ce compte est déjà un client";
        return false;
    }
    return true;
}

route.put("/developpeur", function (req, res) {
    return mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology: true}, function(err){
        if(err) {
            res.statusMessage = errorConnect;
            return res.status(500).end();
        }else{
            project.projectModel.findOne({_id:req.body.id}, function(err, doc){
                if(err) {
                    mongoose.connection.close();
                    res.statusMessage = "Echec vérification id";
                    return res.status(500).end();
                }else{
                    const developpeur = req.body.developpeur;
                    if(doc.Proprietaire.Login.localeCompare(developpeur)===0){
                        mongoose.connection.close();
                        res.statusMessage = "Le proprietaire ne peut être développeur";
                        return res.status(500).end();
                    }
                    let userOk = checkRole(developpeur, doc, res);
                    if(!userOk)
                        return res.status(500).end();
                    user.userModel.findOne({Login:developpeur}, function(err, dev){
                        if(err){
                            mongoose.connection.close();
                            res.statusMessage = "Developpeur inexistant";
                            return res.status(500).end();
                        }else if(dev){
                            doc.Developpeurs.push(dev);
                            doc.save(function(err){
                                if(err){
                                    console.log(err);
                                    res.statusMessage = "Echec de l'ajout du développeur'";
                                    mongoose.connection.close();
                                    return res.status(500).end();
                                }else{
                                    mongoose.connection.close();
                                    res.statusMessage = "Ajout du développeur réussi";
                                    return res.status(201).end();
                                }
                            });
                        }else{
                            mongoose.connection.close();
                            res.statusMessage = "Client inexistant";
                            return res.status(201).end();
                        }
                    });
                }
            });
        }
    });
});

route.put("/client", function (req, res) {
    return mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology: true}, function(err){
        if(err) {
            res.statusMessage = errorConnect;
            return res.status(500).end();
        }else{
            project.projectModel.findOne({_id:req.body.id}, function(err, doc){
                if(err) {
                    mongoose.connection.close();
                    res.statusMessage = "Echec vérification id";
                    return res.status(500).end();
                }else{
                    const client = req.body.client;
                    if(doc.Proprietaire.Login.localeCompare(client)===0){
                        mongoose.connection.close();
                        res.statusMessage = "Le proprietaire ne peut être client";
                        return res.status(500).end();
                    }
                    let userOk = checkRole(client, doc, res);
                    if(!userOk)
                        return res.status(500).end();
                    user.userModel.findOne({Login:client}, function(err, client){
                        if(err){
                            mongoose.connection.close();
                            res.statusMessage = "Echec récupération infos client";
                            return res.status(500).end();
                        }else if (client){
                            doc.Clients.push(client);
                            doc.save(function(err){
                                if(err){
                                    console.log(err);
                                    res.statusMessage = "Echec de l'ajout du client'";
                                    mongoose.connection.close();
                                    return res.status(500).end();
                                }else{
                                    mongoose.connection.close();
                                    res.statusMessage = "Ajout du client réussi";
                                    return res.status(201).end();
                                }
                            });
                        }else{
                            mongoose.connection.close();
                            res.statusMessage = "Client inexistant";
                            return res.status(201).end();
                        }
                    });
                }
            });
        }
    });
});

module.exports = route;