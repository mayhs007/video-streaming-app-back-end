/**
 * TODO
 *
 * Create User  Route,Model,Controller
 *   - Create
 *   - Read
 *   - Update
 *   - Delete
 *   - Login (Admin & User)
 *
 * Create Movie Route,Model,Controller
 *   - Create
 *   - Read
 *   - Update
 *   - Delete
 * **/
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const movieRoutes = require("./routes/movie-routes")
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use("/movie", movieRoutes)

mongoose.connect(process.env.MONGO_DB_URL)
mongoose.connection.on("connected", () => {
  console.log("Connected to mongodb...")
})

mongoose.connection.on("error", err => {
  console.log("Error connecting to mongo", err)
})
app.listen(process.env.PORT, err => {
  if (err) {
    console.error(err)
  }
  console.log("SERVER STARTED SUCCESSFULLY")
})
