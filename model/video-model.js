var mongoose = require("mongoose")

var VideoSchema = mongoose.Schema({
  title: { type: String },
  genre: { type: Array },
  path: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  deletedAt: { type: Date },
})
module.exports = mongoose.model("Video", VideoSchema)
