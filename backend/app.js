
const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')

const connectDB = require('./db/db')
connectDB()

const userRoutes = require("./routes/user.routes")
const captainRoutes = require("./routes/captain.routes")
const mapRoutes = require("./routes/maps.routes")
const rideRoutes = require("./routes/ride.routes")

app.use(cors())
app.use(cookieParser())


app.use(express.json()); // Enable JSON request parsing

app.use(express.urlencoded({ extended: true }))

app.use("/users", userRoutes)
app.use("/captains", captainRoutes)
app.use("/maps", mapRoutes)
app.use("/rides",rideRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

module.exports = app

