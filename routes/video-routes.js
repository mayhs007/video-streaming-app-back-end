const express = require("express")
const router = express.Router()
const multer = require("multer")
const fs = require("fs")

const VideoController = require("../controller/video-controller")
const { gridStorage, gridFileStorage } = require("../helper/storage")
// router.post("/create", upload.single("file"), MovieController.createMovie)

// router.get("/all", VideoController.getVideo)

router.post("/upload", gridStorage().single("file"), VideoController.uploadVideo)

router.get("/all", VideoController.readVideos)
router.get("/:fileName", VideoController.readVideo)

module.exports = router
