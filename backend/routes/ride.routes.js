const express = require("express")
const router = express.Router()
const rideController = require("../controllers/ride.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const { body, query } = require("express-validator")

router.post("/create", authMiddleware.authUser,

    body("pickup").isString().notEmpty().withMessage("pickup is required"),
    body("destination").isString().notEmpty().withMessage("destination is required"),
    body("vehicleType").isString().notEmpty().withMessage("vehicleType is required")
    , rideController.createRide)


router.get("/get-fare", authMiddleware.authUser,
    [
        query("pickup").isString().notEmpty().withMessage("pickup is required"),
        query("destination").isString().notEmpty().withMessage("destination is required")
    ], rideController.getFare
)

    router.post('/confirm',
        authMiddleware.authCaptain,
        body('rideId').isMongoId().withMessage('Invalid ride id'),
        rideController.confirmRide
    )
    
    router.get('/start-ride',
        authMiddleware.authCaptain,
        query('rideId').isMongoId().withMessage('Invalid ride id'),
        query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
        rideController.startRide
    )
    router.post('/end-ride',
        authMiddleware.authCaptain,
        body('rideId').isMongoId().withMessage('Invalid ride id'),
        rideController.endRide
    )
module.exports = router