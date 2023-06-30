var mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")
var AirbnbSchema = mongoose.Schema({
  access: { type: String },
  accomodates: { type: Number },
  //   address: {
  //     country: { type: String },
  //     country_code: { type: String },
  //     goverment_area: { type: String },
  //     type: { type: String },
  //     market: { type: String },
  //     street: { type: String },
  //     suburb: { type: String },
  //     location: {
  //       coordinates: { type: Array },
  //       is_location_exact: { type: Boolean },
  //     },
  //   },
  amentites: { type: String },
  room_type: { type: String },
  property_type: { type: String },
  price: { type: Number },
  number_of_reviews: { type: Number },
  name: { type: String },
})
AirbnbSchema.plugin(mongoosePaginate)
module.exports = mongoose.model("Airbnb", AirbnbSchema)
