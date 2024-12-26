const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, 'Firstname must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, 'Lastname must be at least 3 characters long'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
    },
    password: {
        type: String,
        required: true,
        select: false,
        //select false means that the password will not be returned whn find user in the database
    },
    socketId: {
        type: String,
        default: ''
    },
})

//creating custom methods for the userSchema ....why this aproach ...Encapsulation: The method is directly associated with the userSchema. It's reusable and scoped to user instances.
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET ,{expiresIn:"24hr"})
    return token
}


userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

//Why statics for hashPassword? Because the method is not directly associated with the userSchema. It's a general method that can be used by any user instance.
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;