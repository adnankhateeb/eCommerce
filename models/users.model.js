const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   email: { type: String, required: true, unique: true },
   name: { type: String, required: false },
   address: [{ type: String, required: false }],
});

const User = new mongoose.model("user", userSchema);

module.exports = User;
