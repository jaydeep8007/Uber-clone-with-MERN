const userModel = require("../models/userModel")
const userService = require("../services/user.service")
const { validationResult } = require("express-validator")

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
// console.log(req.body)
    const { fullname, email, password } = req.body

    const hashedPassword = await userModel.hashPassword(password)
    // console.log(hashedPassword)
    
    const user = await userService.createUser({

        firstname: fullname.firstname,
        lastname : fullname.lastname,
        email,
        password: hashedPassword

    })

    const token = user.generateAuthToken()
    res.status(201).json({ user, token })
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

// why +password is used here because we have set select:false in usermodel.js
    const user = await userModel.findOne({email}).select("+password")

    if(!user){
        return res.status(401).json({message:"Invalid email or password"})
    }
    const isMatch = user.comparePassword(password)

    if(!isMatch){
       return res.status(401).json({message:"Invalid email or password"})
    }

    const token = user.generateAuthToken()
    res.status(200).json({token , user})

    // const user = await userService.findUserByEmail(email)

    // if (!user) {
    //     return res.status(404).json({ message: "User not found" })
    // }

    // const isMatch = await userModel.comparePasswords(password, user.password)

    // if (!isMatch) {
    //     return res.status(400).json({ message: "Invalid credentials" })
    // }

    // const token = user.generateAuthToken()
    // res.status(200).json({ user, token })
}