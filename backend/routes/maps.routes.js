const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/auth.middleware")
const mapController = require("../controllers/maps.controller");
const { query } = require('express-validator');

router.get("/get-coordindates",
  [
    // Validate that 'address' is provided and is not empty
    query('address')
      .notEmpty()
      .withMessage('Address is required')
      .isString()
      .withMessage('Address must be a string'),
  ],
  authMiddleware.authUser, mapController.getCoordinates
)

router.get("/get-distance-time",
  [
    // Validate that 'origin' is provided and is not empty
    query('origin')
      .notEmpty()
      .withMessage('Origin is required')
      .isString()
      .withMessage('Origin must be a string'),

    // Validate that 'destination' is provided and is not empty
    query('destination')
      .notEmpty()
      .withMessage('Destination is required')
      .isString()
      .withMessage('Destination must be a string'),
  ],
  authMiddleware.authUser, mapController.getDistanceTime
)

router.get("/get-suggestions",
  [
    // Validate that 'input' is provided and is not empty
    query('input')
      .notEmpty()
      .withMessage('Input is required')
      .isString()
      .withMessage('Input must be a string'),
  ],
  authMiddleware.authUser, mapController.getAutocompleteSuggestions
)


module.exports = router
