const userModel = require("../models/userModel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: "Unauthenticated" })
    }


const isBlacklisted = await userModel.findOne({ "token":token})
if(isBlacklisted){
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