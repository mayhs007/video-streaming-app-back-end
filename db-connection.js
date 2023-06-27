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
  let db = mongoose.connections[0].db
  return new mongoose.mongo.GridFSBucket(db, { bucketName: "videos" })
}
module.exports = { connectDB, getBucket }
