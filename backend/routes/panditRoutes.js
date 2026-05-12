const express = require("express");

const router = express.Router();

const User = require("../models/User");

/* GET ALL PANDITS */

router.get("/", async (req,res)=>{

  try {

    const pandits = await User.find({
      role:"pandit"
    }).select("-password");

    res.status(200).json(pandits);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:"Server Error"
    });

  }

});

module.exports = router;