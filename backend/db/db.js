

const mongoose = require('mongoose');

function connectDB (){
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('MongoDB connection successful');
    })
    .catch((err) => {
        console.error('MongoDB connection failed');
        console.error(err);
    });
}

module.exports = connectDB;