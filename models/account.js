const mongoose = require('mongoose');
<<<<<<< HEAD
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const accountSchema = new Schema({
    username: String,
    password: String
});
accountSchema.plugin(passportLocalMongoose);
// We export the Schema to avoid attaching the model to the
// default mongoose connection.
module.exports = mongoose.model("Account", accountSchema);
=======
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

// Define account schema
const accountSchema = new Schema({
  username: String,
  password: String
});

// Use passport-local-mongoose for authentication-related fields and methods
accountSchema.plugin(passportLocalMongoose);

// Export the model
module.exports = mongoose.model('Account', accountSchema);
>>>>>>> 7aed5c59f629a1cdde052b98f4532532eb01c877
