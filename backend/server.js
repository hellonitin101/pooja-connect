const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

/* IMPORT ROUTES */
const authRoutes = require("./routes/authRoutes");
const panditRoutes = require("./routes/panditRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* DATABASE */
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((error) => {
  console.log(error);
});

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/pandits", panditRoutes);
app.use("/api/bookings", bookingRoutes);

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("PujaConnect API Running");
});

/* SERVER */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});