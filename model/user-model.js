var mongoose = require("mongoose")

var UserSchema = mongoose.Schema({
  name: { type: String },
  role: { type: String },
  phone: { type: Number },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  deletedAt: { type: Date },
})

module.exports = mongoose.model("User", UserSchema)
