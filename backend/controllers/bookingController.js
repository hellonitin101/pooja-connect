const Booking = require("../models/Booking");

/* CREATE BOOKING */

exports.createBooking = async (req,res)=>{

  try {

    const booking = await Booking.create(req.body);

    res.status(201).json({

      message:"Booking Created",

      booking,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:"Server Error"
    });

  }

};

/* GET BOOKINGS */

exports.getBookings = async (req,res)=>{

  try {

    const bookings = await Booking.find();

    res.status(200).json(bookings);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:"Server Error"
    });

  }

};

/* UPDATE STATUS */

exports.updateBookingStatus = async (req,res)=>{

  try {

    const booking = await Booking.findByIdAndUpdate(

      req.params.id,

      {
        status:req.body.status
      },

      {
        new:true
      }

    );

    res.status(200).json({

      message:"Booking Updated",

      booking,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:"Server Error"
    });

  }

};