let mongoose = require("mongoose");
let project = require("./project");

const issueSchema = new mongoose.Schema({
  Projet : {type: project.projectSchema, required: true},
  Role : {type: String, required: true},
  Action : {type: String, required: true},
  Raison : {type: String, required: true}
});
let issueModel = mongoose.model("issue", issueSchema, "issue");

exports.issueModel = issueModel;
exports.issueSchema = issueSchema;