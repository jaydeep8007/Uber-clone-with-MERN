const userModel = require("../models/userModel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captainModel");

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

 

    if (!token) {
        return res.status(401).json({ message: "Unauthenticated" })
    }


    const isBlacklisted = await blacklistTokenModel.findOne({ "token": token })
    if (isBlacklisted) {
        res.status(401).json({ message: "Unauthenticated logout" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded._id)
        //set user to req.user so that we can access it in the next middleware .ajjj as a response chayu jase aapdi profile ma 
        req.user = user
        return next()

    } catch (error) {
        res.status(401).json({ message: "Unauthenticated" })

    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
    // console.log(token)

    if (!token) {
        return res.status(401).json({ message: "Unauthenticated" })
    }


    const isBlacklisted = await blacklistTokenModel.findOne({ "token": token })
    // console.log(isBlacklisted)
    if (isBlacklisted) {
        res.status(401).json({ message: "Unauthenticated logout" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const captain = await captainModel.findById(decoded._id)
        //set user to req.user so that we can access it in the next middleware .ajjj as a response chayu jase aapdi profile ma 
        req.captain = captain
        return next()


    } catch (error) {
        res.status(401).json({ message: "Unauthenticated" })

    }
}