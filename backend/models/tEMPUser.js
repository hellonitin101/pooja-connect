const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true,
  },

  email:{
    type:String,
    required:true,
    unique:true,
  },

  password:{
    type:String,
    required:true,
  },

  phone:{
    type:String,
  },

  location:{
    type:String,
  },

  experience:{
    type:String,
  },

  languages:{
    type:String,
  },

  rituals:{
    type:String,
  },

  pricing:{
    type:String,
  },

  bio:{
    type:String,
  },

  role:{
    type:String,
    enum:["user","pandit","admin"],
    default:"user",
  },

  createdAt:{
    type:Date,
    default:Date.now,
  }

});

module.exports = mongoose.model("User",userSchema);