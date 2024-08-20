const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');

// Import routes
const userRoutes = require('./routes/userroute');
const bikeRoutes = require('./routes/bikesroute'); // Add this line

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/bikes", bikeRoutes); // Add this line

// Database connection
try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Database is connected with Application successfully");
} catch (error) {
    console.log(error);
}

const Port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
    app.use(express.static("build"));
}

app.listen(Port, () => {
    console.log(`App is running on ${Port}`);
});
