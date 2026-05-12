const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

/* =========================
   REGISTER
========================= */

exports.register = async (req,res)=>{

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
      role

    } = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser){

      return res.status(400).json({
        message:"User already exists"
      });

    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await User.create({

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
      role,

    });

    res.status(201).json({

      message:"Registration Successful",

      user,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:"Server Error"
    });

  }

};

/* =========================
   LOGIN
========================= */

exports.login = async (req,res)=>{

  try {

    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user){

      return res.status(400).json({
        message:"Invalid Email"
      });

    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){

      return res.status(400).json({
        message:"Invalid Password"
      });

    }

    const token = jwt.sign(

      {
        id:user._id,
        role:user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn:"7d",
      }

    );

    res.status(200).json({

      message:"Login Successful",

      token,

      user,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:"Server Error"
    });

  }

};

/* GET USERS */

exports.getUsers = async (req,res)=>{

  try {

    const users = await User.find()
    .select("-password");

    res.status(200).json(users);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:"Server Error"
    });

  }

};

/* DELETE USER */

exports.deleteUser = async (req,res)=>{

  try {

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message:"User Deleted"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:"Server Error"
    });

  }

};