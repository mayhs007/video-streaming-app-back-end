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
module.exports = gridStorage
