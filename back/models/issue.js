var mongoose = require('mongoose');

var issueSchema = new mongoose.Schema({
  IDProjet : {type: String, required: true},
  Role : {type: String, required: true},
  Action : {type: String, required: true},
  Raison : {type: String, required: true}
});
var issueModel = mongoose.model('issue', issueSchema, 'issue');

exports.issueModel = issueModel;
exports.issueSchema = issueSchema;