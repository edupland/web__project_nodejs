var mongoose = require('mongoose');

var customUserSchema = new mongoose.Schema({
    Nom : { type: String, required: true},
    Prenom : { type: String, required: true},
    Mail : { type: String, required: true},
    Societe : { type: String, required: true},
    Login : { type: String, required: true},
    Password : { type: String, required: true}
});

var projectSchema = new mongoose.Schema({
    Titre : { type: String, required: true},
    Description : { type: String},
    Proprietaire : { type: customUserSchema, required: true},
    Developpeurs : {type: [customUserSchema]},
    Clients : {type: [customUserSchema]}
});
var projectModel = mongoose.model('project', projectSchema, 'project');

exports.projectModel = projectModel;