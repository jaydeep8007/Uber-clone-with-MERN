const express = require("express")
const router = express.Router()
const rideController = require("../controllers/ride.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const {body} = require("express-validator")

router.post("/create",authMiddleware.authUser,
    
        
        body("pickup").isString().notEmpty().withMessage("pickup is required"),
        body("destination").isString().notEmpty().withMessage("destination is required"),
        body("vehicleType").isString().notEmpty().withMessage("vehicleType is required")
    
    
    
   ,rideController.createRide)


module.exports = router