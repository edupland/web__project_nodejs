let mongoose = require("mongoose");
let project = require("./project");

const taskSchema = new mongoose.Schema({
  Projet : {type: project.projectSchema, required: true},
  Titre : {type: String, required: true},
  Description : {type: String, required: true},
  Statut : {type: String, enum: ["todo", "pending", "done"]}
});
let taskModel = mongoose.model("task", taskSchema, "task");

exports.taskModel = taskModel;
exports.taskSchema = taskSchema;