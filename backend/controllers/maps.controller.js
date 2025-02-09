const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');

module.exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;

  try {
    if (!address) {
      return res.status(400).json({ message: 'Address is required' });
    }

    const coordinates = await mapService.getAddressCoordinates(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.getDistanceTime = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { origin, destination } = req.query;
    
    try {
        if (!origin || !destination) {
        return res.status(400).json({ message: 'Origin and destination are required' });
        }
    
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
module.exports.getAutocompleteSuggestions = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { input } = req.query;
    
    try {
        if (!input) {
        return res.status(400).json({ message: 'Input is required' });
        }
    
        const suggetions = await mapService.getAutocompleteSuggestions(input);
        res.status(200).json(suggetions);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}