const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const houseOwnerSchema = new Schema({
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
    rent: {
        type: Number,
        required: true
    },
    advance: {
        type: Number,
        required: true
    },
    independentHouse: {
        type: String,
        required: true
    },
    newHouse: {
        type: String,
        required: true
    },
    rooms: {
        type: String,
        required: true
    },
    maxNo: {
        type: String,
        required: false
    },
    pets: {
        type: String,
        required: false
    },
    family: {
        type: String,
        required: true
    },
    textArea: {
        type: String,
        required: false
    }
}, { timestamps: true });

const HouseOwner = mongoose.model('houseowner', houseOwnerSchema);
module.exports = HouseOwner;