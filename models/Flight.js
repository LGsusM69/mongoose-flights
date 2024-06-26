const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const destinationSchema = new Schema({

    airport: {type: String, enum: ["AUS", "DFW", "DEN", "LAX", "SAN"]},
    arrival: Date
});

const flightSchema = new Schema({
    airline: {type: String, enum: ["American", "Southwest", "United", "Viva"]},
    airport: {type: String, enum: ["AUS", "DFW", "DEN", "LAX", "SAN", "CJS"], default: "DEN"},
    flightNo: {type: Number, required: true, min: 10, max: 9999},
    departs: {type: Date, default: () => Date.now() + 7*24*60*60*1000},
    destinations: [destinationSchema]
}, {timestamps: true});

module.exports = mongoose.model("Flight", flightSchema);