const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const { connectDB } = require("./db-connection")
require("dotenv").config()

const app = express()
connectDB()
app.use(cors())
app.use(express.json())

const VideoRoutes = require("./routes/video-routes")
app.use("/video", VideoRoutes)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log("Application live on localhost:" + process.env.PORT)
})
