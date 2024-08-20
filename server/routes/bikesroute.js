


const express = require('express');
const router = express.Router();
const bikeController = require('../controller/bikes');

// Create a new bike
router.post('/register', bikeController.createBike);

// Get all bikes
router.get('/', bikeController.getAllBikes);

// Get a bike by ID (Bike Tracking)
router.get('/:id', bikeController.getBikeById);

// Update a bike by ID
router.put('/update/:id', bikeController.updateBikeById);

// Delete a bike by ID
router.delete('/delete/:id', bikeController.deleteBikeById);


module.exports = router;