var mongoose = require("mongoose")
const Airbnb = require("../model/airbnb-model")
const { ObjectId } = require("mongodb")
let statusCode = 200
let headers = {
  "Content-type": "application/json",
}
let fields = ["name", "bedrooms", "accommodates", "beds", "amenities"]
const readAirbnbs = (request, response) => {
  /*
   * Pagination
   *  - Page
   *  - Limit
   *  - Total
   *
   */
  let page = parseInt(request.query.page) || 1
  let limit = parseInt(request.query.limit) || 50
  limit = limit > 50 ? 50 : limit
  let descending = request.query.descending?.toLowerCase() === "true" ? -1 : 1
  let field = request.query.field

  let data
  try {
    //select name,bedrooms,accommodates,beds from airbnbs;

    //select name,bedrooms,accommodates,beds from airbnbs where accomodates > 2
    /*
     *
     * where
     *  - greater than (gt)
     *  - less than (lt)
     *  - equal to (equals)
     *  - not equal to (ne)
     *  - greater than equal to (gte)
     *  - less than equal to (lte)
     */

    // Airbnb.find({}, fields)
    //   .where("accommodates")
    //Below uncomment based on your requirements
    //   .gt(2)
    //   .lt(2)
    //   .equals(2)
    //   .ne(2)
    //   .gte(2)
    //   .lte(6)
    //   .limit(limit)
    //   .skip((page - 1) * limit)
    //   .sort({[field]:descending})
    //   .then(airbnbs => {
    //     Airbnb.count({})
    //       .where("accommodates")
    //       .lte(6)
    //       .then(count => {
    //         if (airbnbs.length > 0) {
    //           data = {
    //             meta: { page: page, limit: limit, total: count },
    //             data: { airbnbs: airbnbs },
    //           }
    //         } else {
    //           data = { error: "No Data found" }
    //           statusCode = 500
    //         }
    //         response.writeHead(statusCode, headers)
    //         response.write(JSON.stringify(data))
    //         response.end()
    //       })
    //   })
    let options = {
      select: fields,
      page,
      limit,
      sort: { [field]: descending }, // -1 descending
      // sort: { accommodates: 1 }, //   1 aescending
    }

    let query = {
      // accommodates: 2,  // -> Equal
      // accommodates: {
      //   //   // $gt: 10,   // -> Greater
      //   //   // $lt: 5,    // -> Less
      //   //   // $eq: 2,    // -> Equal
      //   //   // $ne: 6,    // -> Not Equal
      //   //   // $gte: 8,   // -> GreaterThanEqual
      //   //   // $lte: 2,   // -> LessThanEqual
      // },
    }

    //{ page:page,limit:limit}
    //{ page:1,limit:10}

    //Paiginate Syntax
    //Model.paginate(query,options).then(result=>{})

    Airbnb.paginate(query, options).then(result => {
      if (result.docs.length > 0) {
        //skips the "Unused Variable"
        let { docs: _, ...rest } = result

        data = {
          meta: rest,
          data: { airbnbs: result.docs },
        }
      } else {
        data = { error: "No data found" }
        statusCode = 500
      }
      response.writeHead(statusCode, headers)
      response.write(JSON.stringify(data))
      response.end()
    })
  } catch (error) {
    response.writeHead(500, headers)
    response.write(JSON.stringify({ error: error.message }))
    response.end()
  }
}
const findOneAirbnb = (request, response) => {
  let { airbnb } = request.body
  Airbnb.findOne({ ...airbnb }, fields)
    // .skip(10)
    .then(result => {
      response.writeHead(statusCode, headers)
      response.write(JSON.stringify({ airbnb: result }))
      response.end()
    })
}
const updateObjectId = (request, response) => {
  Airbnb.find().then(airbnbs => {
    let data
    for (let airbnb of airbnbs) {
      console.log(typeof airbnb.listing_url)
      for (let key in airbnb._doc) {
        data = {
          ...data,
          [key]: typeof airbnb[key],
        }
      }
    }
    response.writeHead(statusCode, headers)
    response.write(JSON.stringify({ airbnb: data }))
    response.end()
  })
}
const findOneAndUpdateAirbnb = (request, response) => {
  let { airbnb, filter } = request.body
  //Syntax
  //findOneAndUpdate(filter,update,option,callback)
  //!important use $set key
  Airbnb.findOneAndUpdate(
    { ...filter },
    { $set: { ...airbnb } },
    { new: true, fields }
  ).then(result => {
    response.writeHead(statusCode, headers)
    response.write(JSON.stringify({ airbnb: result }))
    response.end()
  })
}
const findOneAndReplaceAirbnb = (request, response) => {
  let { airbnb, filter } = request.body
  //findOneAndUpdate(filter,update,option,callback)
  Airbnb.findOneAndReplace({ ...filter }, { ...airbnb }, { fields }).then(result => {
    response.writeHead(statusCode, headers)
    response.write(JSON.stringify({ airbnb: result }))
    response.end()
  })
}
const findOneAndRemoveAirbnb = (request, response) => {
  let { filter } = request.body
  //findOneAndUpdate(filter,update,option,callback)
  Airbnb.findOneAndRemove({ ...filter }).then(result => {
    response.writeHead(statusCode, headers)
    response.write(JSON.stringify({ airbnb: result }))
    response.end()
  })
}
const findOneAndDeleteAirbnb = (request, response) => {
  let { filter } = request.body
  //findOneAndUpdate(filter,update,option,callback)
  Airbnb.findOneAndDelete({ ...filter }).then(result => {
    response.writeHead(statusCode, headers)
    response.write(JSON.stringify({ airbnb: result }))
    response.end()
  })
}
const findByIdAirbnb = (request, response) => {
  let { filter } = request.body
  //findOneAndUpdate(filter,update,option,callback)
  Airbnb.findById({ ...filter }).then(result => {
    response.writeHead(statusCode, headers)
    response.write(JSON.stringify({ airbnb: result }))
    response.end()
  })
}
const findByIdAndUpdateAirbnb = (request, response) => {
  let { airbnb, filter } = request.body
  //!important use $set key

  try {
    //To Modify Array
    // Airbnb.findById(filter._id).then(result => {
    //   let { amenities } = airbnb
    //   result._doc["amenities"] = amenities
    //   result.markModified("amenities")
    //   result.save().then(result => {
    //     response.writeHead(statusCode, headers)
    //     response.write(JSON.stringify({ airbnb: result }))
    //     response.end()
    //   })
    // })
    //To Modify Everything expect array
    Airbnb.findByIdAndUpdate(
      filter._id,
      { $set: { ...airbnb } },
      { new: true, fields }
    ).then(result => {
      response.writeHead(statusCode, headers)
      response.write(JSON.stringify({ airbnb: result }))
      response.end()
    })
  } catch (err) {
    response.writeHead(500, headers)
    response.write(JSON.stringify({ error: err.message }))
    response.end()
  }
}
const findByIdAndRemoveAirbnb = (request, response) => {
  let { filter } = request.body
  Airbnb.findByIdAndRemove({ ...filter }).then(result => {
    response.writeHead(statusCode, headers)
    response.write(JSON.stringify({ airbnb: result }))
    response.end()
  })
}
const findByIdAndDeleteAirbnb = (request, response) => {
  let { filter } = request.body

  Airbnb.findByIdAndDelete({ ...filter }).then(result => {
    response.writeHead(statusCode, headers)
    response.write(JSON.stringify({ airbnb: result }))
    response.end()
  })
}
const deleteOneAirbnb = (request, response) => {
  let { filter } = request.body
  Airbnb.deleteOne({ ...filter }).then(result => {
    response.writeHead(statusCode, headers)
    response.write(JSON.stringify({ airbnb: result }))
    response.end()
  })
}
const deleteManyAirbnb = (request, response) => {
  let { filter } = request.body
  Airbnb.deleteMany({ ...filter }).then(result => {
    response.writeHead(statusCode, headers)
    response.write(JSON.stringify({ airbnb: result }))
    response.end()
  })
}
const replaceOneAirbnb = (request, response) => {
  let { airbnb, filter } = request.body
  Airbnb.replaceOne({ ...filter }, { $set: { ...airbnb } }).then(result => {
    response.writeHead(statusCode, headers)
    response.write(JSON.stringify({ airbnb: result }))
    response.end()
  })
}
const updateManyAirbnb = (request, response) => {
  let { airbnb, filter } = request.body
  Airbnb.updateMany({ ...filter }, { $set: { ...airbnb } }).then(result => {
    response.writeHead(statusCode, headers)
    response.write(JSON.stringify({ airbnb: result }))
    response.end()
  })
}
const updateOneAirbnb = (request, response) => {
  let { airbnb, filter } = request.body
  Airbnb.updateOne({ ...filter }, { $set: { ...airbnb } }).then(result => {
    response.writeHead(statusCode, headers)
    response.write(JSON.stringify({ airbnb: result }))
    response.end()
  })
}

const AirbnbController = {
  readAirbnbs,
  updateObjectId,

  findOneAirbnb,
  findOneAndUpdateAirbnb,
  findOneAndReplaceAirbnb,
  findOneAndRemoveAirbnb,
  findOneAndDeleteAirbnb,

  findByIdAirbnb,
  findByIdAndUpdateAirbnb,
  findByIdAndRemoveAirbnb,
  findByIdAndDeleteAirbnb,

  deleteOneAirbnb,
  deleteManyAirbnb,
  replaceOneAirbnb,
  updateManyAirbnb,
  updateOneAirbnb,
}
module.exports = AirbnbController
