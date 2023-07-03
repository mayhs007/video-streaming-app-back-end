const express = require("express")
const AirbnbController = require("../controller/airbnb-controller")
const router = express.Router()

router.get("/all", AirbnbController.readAirbnbs)
router.post("/find-one", AirbnbController.findOneAirbnb)
router.post("/update-object-id", AirbnbController.updateObjectId)
router.post("/find-one-and-update", AirbnbController.findOneAndUpdateAirbnb)
router.post("/find-one-and-replace", AirbnbController.findOneAndReplaceAirbnb)
router.post("/find-one-and-remove", AirbnbController.findOneAndRemoveAirbnb)
router.post("/find-one-and-delete", AirbnbController.findOneAndDeleteAirbnb)

router.post("/find-by-id", AirbnbController.findByIdAirbnb)
router.post("/find-by-id-and-update", AirbnbController.findByIdAndUpdateAirbnb)
router.post("/find-by-id-and-remove", AirbnbController.findByIdAndRemoveAirbnb)
router.post("/find-by-id-and-delete", AirbnbController.findByIdAndDeleteAirbnb)

router.post("/delete-one", AirbnbController.deleteOneAirbnb)
router.post("/delete-many", AirbnbController.deleteManyAirbnb)
router.post("/replace-one", AirbnbController.replaceOneAirbnb)
router.post("/update-one", AirbnbController.updateOneAirbnb)
router.post("/update-many", AirbnbController.updateManyAirbnb)

// router.post("/create")
// router.get("/get/:uuid")
// router.post("/update")
// router.post("/delete")
module.exports = router
