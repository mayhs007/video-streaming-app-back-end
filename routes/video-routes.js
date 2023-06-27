const express = require("express")
const router = express.Router()
const multer = require("multer")
const fs = require("fs")

const VideoController = require("../controller/video-controller")
const gridStorage = require("../helper/storage")

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    if (!fs.existsSync("../front-end/public")) {
      fs.mkdirSync("../front-end/public")
    }
    if (!fs.existsSync("../front-end/public/movies")) {
      fs.mkdirSync("../front-end/public/movies")
    }
    if (!fs.existsSync("../front-end/public/movies/" + file.originalname)) {
      cb(null, "../front-end/public/movies")
    } else {
      cb("File already Found", null)
    }
  },
  filename: (request, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

// router.post("/create", upload.single("file"), MovieController.createMovie)

// router.get("/all", VideoController.getVideo)

router.post("/upload", gridStorage().single("file"), VideoController.uploadVideo)

router.get("/:fileName", VideoController.readVideo)

module.exports = router
