let mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Nom : { type: String, required: true},
    Prenom : { type: String, required: true},
    Mail : { type: String, required: true},
    Societe : { type: String, required: true},
    Login : { type: String, required: true, unique: true},
    Password : { type: String, required: true}
});
let userModel = mongoose.model("user", userSchema, "user");

exports.userModel = userModel;
exports.userSchema = userSchema;