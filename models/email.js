let mongoose = require("mongoose");

// Email
let EmailSchema = new mongoose.Schema({
    email: String
});

module.exports = mongoose.model("Email", EmailSchema);