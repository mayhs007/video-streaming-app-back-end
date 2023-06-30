const multer = require("multer")
const { GridFsStorage } = require("multer-gridfs-storage")

const gridStorage = () => {
  let storageFs = new GridFsStorage({
    url: process.env.MONGO_DB_URL,
    file: (request, file) => {
      return {
        filename: file.originalname,
        bucketName: "videos",
      }
    },
  })
  return multer({ storage: storageFs })
}
const gridFileStorage = () => {
  let storage = multer.diskStorage({
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
  return multer({ storage: storage })
}
module.exports = { gridStorage, gridFileStorage }
