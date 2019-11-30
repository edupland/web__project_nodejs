var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
  IDProjet : {type: String, required: true},
  Titre : {type: String, required: true},
  Description : {type: String, required: true},
  Statut : {type: String, enum: ['todo', 'pending', 'done']}
});
var taskModel = mongoose.model('task', taskSchema, 'task');

exports.taskModel = taskModel;
exports.taskSchema = taskSchema;