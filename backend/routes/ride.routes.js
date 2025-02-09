const express = require("express")
const router = express.Router()
const rideController = require("../controllers/ride.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const { body , query } = require("express-validator")

router.post("/create", authMiddleware.authUser,


        body("pickup").isString().notEmpty().withMessage("pickup is required"),
        body("destination").isString().notEmpty().withMessage("destination is required"),
        body("vehicleType").isString().notEmpty().withMessage("vehicleType is required")
        , rideController.createRide)


router.get("/get-fare", authMiddleware.authUser,
    [
        query("pickup").isString().notEmpty().withMessage("pickup is required"),
        query("destination").isString().notEmpty().withMessage("destination is required")
    ], rideController.getFare)

module.exports = router