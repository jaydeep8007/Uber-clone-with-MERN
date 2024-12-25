
const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const cors = require('cors')

const connectDB = require('./db/db')
connectDB()

userRoutes = require("./routes/user.routes")

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/users", userRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

module.exports = app

