const Pandit = require("../models/Pandit");
const bcrypt = require("bcryptjs");


// REGISTER PANDIT

exports.registerPandit = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      phone,
      location,
      experience,
      languages,
      rituals,
      pricing,
      bio,
    } = req.body;

    // Check existing

    const existingPandit = await Pandit.findOne({ email });

    if(existingPandit){
      return res.status(400).json({
        message:"Pandit already exists",
      });
    }

    // Hash password

    const hashedPassword = await bcrypt.hash(password,10);

    // Create pandit

    const pandit = await Pandit.create({

      name,
      email,
      password:hashedPassword,
      phone,
      location,
      experience,
      languages,
      rituals,
      pricing,
      bio,

    });

    res.status(201).json({
      message:"Pandit Registered Successfully",
      pandit,
    });

  } catch (error) {

    res.status(500).json({
      message:error.message,
    });

  }

};


// GET ALL PANDITS

exports.getPandits = async (req, res) => {

  try {

    const pandits = await Pandit.find();

    res.status(200).json(pandits);

  } catch (error) {

    res.status(500).json({
      message:error.message,
    });

  }

};