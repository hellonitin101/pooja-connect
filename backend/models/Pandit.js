const mongoose = require("mongoose");

const panditSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  phone: String,

  location: String,

  experience: String,

  languages: String,

  rituals: String,

  pricing: String,

  bio: String,

  role: {
    type: String,
    default: "pandit",
  },

});

module.exports = mongoose.model("Pandit", panditSchema);