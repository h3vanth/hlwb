const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const landOwnerSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    houseNo: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true
    },
    sqFt: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    textArea: {
        type: String,
        required: false
    }
    }, { timestamps: true });

const LandOwner = mongoose.model('landowner', landOwnerSchema);
module.exports = LandOwner;