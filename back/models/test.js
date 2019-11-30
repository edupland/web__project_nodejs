var mongoose = require('mongoose');

var testSchema = new mongoose.Schema({
    IDProjet : {type: String, required: true},
    testGiven : {type: String, required: true},
    testWhen : {type: String, required: true},
    testThen : {type: String, required: true}
});
var testModel = mongoose.model('test', testSchema, 'test');

exports.testModel = testModel;
exports.testSchema = testSchema;