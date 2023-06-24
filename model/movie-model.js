var mongoose = require("mongoose")

var MovieSchema = mongoose.Schema({
  title: { type: String },
  genre: { type: Array },
  path: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  deletedAt: { type: Date },
})
module.exports = mongoose.model("Movie", MovieSchema)
