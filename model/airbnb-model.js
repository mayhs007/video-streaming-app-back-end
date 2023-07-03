var mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")
var AirbnbSchema = mongoose.Schema({
  _id: { type: mongoose.SchemaTypes.ObjectId },
  access: { type: String },
  accomodates: { type: Number },
  address: {
    country: { type: String },
    country_code: { type: String },
    goverment_area: { type: String },
    type: { type: String },
    market: { type: String },
    street: { type: String },
    suburb: { type: String },
    location: {
      coordinates: { type: Array },
      is_location_exact: { type: Boolean },
    },
  },
  amentites: { type: mongoose.SchemaTypes.Array },
  room_type: { type: String },
  property_type: { type: String },
  price: { type: mongoose.SchemaTypes.Decimal128 },
  number_of_reviews: { type: Number },
  name: { type: String },
  bedrooms: { type: Number },
  beds: { type: Number },
})
AirbnbSchema.plugin(mongoosePaginate)
module.exports = mongoose.model("Airbnb", AirbnbSchema)
