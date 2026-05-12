const express = require("express");

const router = express.Router();

const {

  createBooking,
  getBookings,
  updateBookingStatus

} = require("../controllers/bookingController");

/* ROUTES */

router.post("/",createBooking);

router.get("/",getBookings);

router.put("/:id",updateBookingStatus);

module.exports = router;