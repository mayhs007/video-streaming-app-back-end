const express = require("express")
const AirbnbController = require("../controller/airbnb-controller")
const router = express.Router()

router.get("/all", AirbnbController.readAirbnbs)
// router.post("/create")
// router.get("/get/:uuid")
// router.post("/update")
// router.post("/delete")
module.exports = router
