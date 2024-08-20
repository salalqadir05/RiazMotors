const Bike = require('../models/bikes');

// Create a new bike
exports.createBike = async (req, res) => {
    try {
        const existingBike = await Bike.findOne({ bikeId: req.body.bikeId });
        if (existingBike) {
            return res.status(400).send({ error: 'Bike already exists in the database' });
        }

        const bike = new Bike(req.body);
        await bike.save();
        res.status(201).send(bike);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all bikes
exports.getAllBikes = async (req, res) => {
    try {
        const bikes = await Bike.find({});
        if (bikes.length === 0) {
            return res.status(404).send({ message: 'No bikes found' });
        }
        res.status(200).send(bikes);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a bike by ID (Bike Tracking)
exports.getBikeById = async (req, res) => {
    const bikeId = req.params.id; // Use bikeId instead of _id
    try {
        const bike = await Bike.findOne({ bikeId }); // Use bikeId instead of _id
        if (!bike) {
            return res.status(404).send({ message: 'Bike not found' });
        }
        res.status(200).send(bike);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a bike by ID
exports.updateBikeById = async (req, res) => {
    const bikeId = req.params.id; // Use bikeId instead of _id
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        'ownerName', 'fatherName', 'registrationNumber', 'cnic',
        'dateOfPurchase', 'engineNumber', 'chassisNumber', 'salePrice',
        'buyerName', 'loanDetail', 'phoneNumber', 'keyNumber', 'otherDetails', 'bikeStatus'
    ];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const bike = await Bike.findOneAndUpdate({ bikeId }, req.body, { new: true, runValidators: true }); // Use bikeId instead of _id

        if (!bike) {
            return res.status(404).send({ message: 'Bike not found' });
        }

        res.status(200).send(bike);
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(400).send({ error: 'Failed to update bike. Please try again.' });
    }
};

// Delete a bike by ID
exports.deleteBikeById = async (req, res) => {
    const bikeId = req.params.id;
    console.log(`Received bikeId for deletion: ${bikeId}`); // Log bikeId

    try {
        const bike = await Bike.findOneAndDelete({ bikeId });
        console.log(`Deleted bike: ${bike}`);

        if (!bike) {
            return res.status(404).send({ message: 'Bike not found' });
        }

        res.status(200).send({ message: 'Bike deleted successfully', bike });
    } catch (error) {
        console.error('Error deleting bike:', error); // Log error
        res.status(500).send({ error: 'Failed to delete bike. Please try again.' });
    }
};
