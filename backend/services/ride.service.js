const crypto = require("crypto");
const rideModel = require("../models/ride.model")
const mapService = require("./maps.service");
const { sendMessageToSocketId } = require("../socket");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("pickup and destination are required")
  }



    const distanceTime = await mapService.getDistanceTime(pickup, destination);
  
    // Adjusted Base Fare
    const baseFare = {
      auto: 25,  
      car: 40,   
      motorcycle: 15, 
    };
  
    // Adjusted Per Km Rate
    const perKmRate = {
      auto: 8,  
      car: 12,  
      motorcycle: 6,  
    };
  
    // Adjusted Per Minute Rate
    const perMinuteRate = {
      auto: 1.5,  
      car: 2.5,  
      motorcycle: 1,  
    };
  
    // Fare calculation logic with a minimum fare cap
    const fare = {
      auto: Math.max(
        30,  // Minimum fare cap
        Math.round(
          baseFare.auto +
            (distanceTime.distance / 1000) * perKmRate.auto +
            (distanceTime.duration / 60) * perMinuteRate.auto
        )
      ),
      car: Math.max(
        50,  // Minimum fare cap
        Math.round(
          baseFare.car +
            (distanceTime.distance / 1000) * perKmRate.car +
            (distanceTime.duration / 60) * perMinuteRate.car
        )
      ),
      motorcycle: Math.max(
        25,  // Minimum fare cap
        Math.round(
          baseFare.motorcycle +
            (distanceTime.distance / 1000) * perKmRate.motorcycle +
            (distanceTime.duration / 60) * perMinuteRate.motorcycle
        )
      ),
    };
  
    return fare;
  }
  
  module.exports.getFare = getFare;
  


function getOtp(num) {
  function generateOtp(num) {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
  }

  return generateOtp(num);
}

module.exports.createRide = async ({
  user, pickup, destination, vehicleType
}) => {
  console.log(user, pickup, destination, vehicleType)
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("user, pickup, destination and vehicletype are required")
  }
  const fare = await getFare(pickup, destination)
  console.log(fare)
  const ride = rideModel.create({
    user,
    pickup,
    destination,
    fare: fare[vehicleType],
    otp: getOtp(6)
  })
  return ride
}

module.exports.confirmRide = async ({
  rideId, captain
}) => {
  if (!rideId) {
    throw new Error('Ride id is required');
  }

  await rideModel.findOneAndUpdate({
    _id: rideId
  }, {
    status: 'accepted',
    captain: captain._id
  })

  const ride = await rideModel.findOne({
    _id: rideId
  }).populate('user').populate('captain').select('+otp');

  if (!ride) {
    throw new Error('Ride not found');
  }

  return ride;

}


module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
    throw new Error('Ride id and OTP are required');
  }

  const ride = await rideModel.findOne({
    _id: rideId
  }).populate('user').populate('captain').select('+otp');

  if (!ride) {
    throw new Error('Ride not found');
  }

  if (ride.status !== 'accepted') {
    throw new Error('Ride not accepted');
  }

  if (ride.otp !== otp) {
    throw new Error('Invalid OTP');
  }

  await rideModel.findOneAndUpdate({
    _id: rideId
  }, {
    status: 'ongoing'
  })
  sendMessageToSocketId(ride.user.socketId, {
    event: 'ride-started',
    data: ride
  })
  return ride;
}


module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
      throw new Error('Ride id is required');
  }

  const ride = await rideModel.findOne({
      _id: rideId,
      captain: captain._id
  }).populate('user').populate('captain').select('+otp');

  if (!ride) {
      throw new Error('Ride not found');
  }

  if (ride.status !== 'ongoing') {
      throw new Error('Ride not ongoing');
  }

  await rideModel.findOneAndUpdate({
      _id: rideId
  }, {
      status: 'completed'
  })

  return ride;
}

