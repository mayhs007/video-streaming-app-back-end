const Grid = require("gridfs-stream")
const mongoose = require("mongoose")
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
const getBucket = () => {
  //ODM-> Object Data Modeling
  let db = mongoose.connections[0].db
  return new mongoose.mongo.GridFSBucket(db, { bucketName: "videos" })
}
const getGrid = () => {
  return Grid(mongoose.connection.db, mongoose.mongo)
}
module.exports = { connectDB, getBucket, getGrid }
