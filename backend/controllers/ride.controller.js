
 const rideService = require("../services/ride.service")
 const {validationResult } = require("express-validator")

 module.exports.createRide = async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;

    // Ensure the required fields are present
    if (!pickup || !destination || !vehicleType) {
        return res.status(400).json({ errors: [{ msg: "All fields are required." }] });
    }

    try {
        // Create a new ride
        const ride = await rideService.createRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        });

        return res.status(201).json({ ride });

    } catch (err) {
        console.error("Error creating ride:", err.message);
        res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
    }
};