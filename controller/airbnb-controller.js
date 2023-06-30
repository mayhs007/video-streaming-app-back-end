const Airbnb = require("../model/airbnb-model")
let statusCode = 200
let headers = {
  "Content-type": "application/json",
}
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
  let descending = request.query.descending.toLowerCase() === "true" ? -1 : 1
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

    let fields = ["name", "bedrooms", "accommodates", "beds"]
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
const AirbnbController = {
  readAirbnbs,
}
module.exports = AirbnbController
