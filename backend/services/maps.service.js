

const axios = require("axios");

/**
 * Function to get coordinates (latitude and longitude) of an address using Google Maps API.
 * @param {string} address - The address to get coordinates for.
 * @returns {Promise<Object>} - An object containing `lat` and `lng`.
 */
module.exports.getAddressCoordinates = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    // Make a GET request to the Google Maps API
    const response = await axios.get(url);

    if (response.data.status === 'OK') {
      // Extract latitude and longitude from the first result
      const location = response.data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } else {
      throw new Error(`Unable to fetch coordinates. API status: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    throw new Error('Error fetching coordinates');
  }
};


module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    
    console.log("Google API Response:", JSON.stringify(response.data, null, 2));

    if (response.data.status !== "OK") {
      throw new Error("Unable to fetch distance and time");
    }

    const rows = response.data.rows;
    if (!rows || !rows.length || !rows[0].elements || !rows[0].elements.length) {
      throw new Error("Invalid response structure from Google API");
    }

    const element = rows[0].elements[0];

    if (element.status !== "OK") {
      throw new Error("No routes found");
    }

    return {
      distance: element.distance.value, // Use value instead of text
      duration: element.duration.value, // Use value instead of text
    };
  } catch (error) {
    console.error("Error fetching distance and time:", error.message);
    throw new Error("An error occurred while fetching distance and time");
  }
};

module.exports.getAutocompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error('Input is required')}
  const apiKey = process.env.GOOGLE_MAPS_API
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
      return response.data.predictions 
      // .map(prediction => prediction.description);
    } else {
      throw new Error('Unable to fetch autocomplete suggestions');
    }
  } catch (error) {
    console.error(error.message);
    throw new Error('An error occurred while fetching autocomplete suggestions');
  }
}
