const mongoose = require("mongoose")

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain'
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'pending'
    }, duration: {
        Type: Number
    },
    distance: {
        Type: Number
    },
    paymentId: {
        Type: String
    },
    orderId: {
        Type: String
    },
    signature: {
        Type: String
    },
    otp: {
        type: String,
        required: true,
        select: false
    }
})

module.exports = mongoose.model("ride", rideSchema)