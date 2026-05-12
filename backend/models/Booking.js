const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

  userName:{
    type:String,
    required:true,
  },

  userEmail:{
    type:String,
    required:true,
  },

  phone:{
    type:String,
    required:true,
  },

  address:{
    type:String,
    required:true,
  },

  pujaType:{
    type:String,
    required:true,
  },

  bookingDate:{
    type:String,
    required:true,
  },

  bookingTime:{
    type:String,
    required:true,
  },

  message:{
    type:String,
  },

  panditId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
  },

  panditName:{
    type:String,
  },

  status:{
    type:String,
    enum:["pending","accepted","rejected"],
    default:"pending",
  },

  createdAt:{
    type:Date,
    default:Date.now,
  }

});

module.exports = mongoose.model("Booking",bookingSchema);