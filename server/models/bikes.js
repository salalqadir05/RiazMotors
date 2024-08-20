const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
    bikeId: {
        type: String,
        required: true,
        unique: true
    },
    ownerName: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true
    },
    cnic: {
        type: String,
        required: true
    },
    dateOfPurchase: {
        type: Date,
        required: true
    },
    engineNumber: {
        type: String,
        required: true
    },
    chassisNumber: {
        type: String,
        required: true
    },
    salePrice: {
        type: Number,
        required: true
    },
    buyerName: {
        type: String,
        required: true
    },
    loanDetail: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: true
    },
    keyNumber: {
        type: String,
        required: true
    },
    otherDetails: {
        type: String,
        required: false
    },
    bikeStatus: {
        type: String,
        enum: ['new', 'old'],
        required: true
    }
}, {
    timestamps: true
});

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;