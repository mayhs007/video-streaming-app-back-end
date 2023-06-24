const Movie = require("../model/movie-model")
let options = {
  "Content-type": "application/json",
}

const createMovie = (request, response) => {
  let statusCode = 200
  let data = {}
  let { originalname } = request.file
  let { title, genre } = request.body

  Movie.find({ title: originalname }).then(movies => {
    if (movies.length > 0) {
      data = { error: "Movie already exists" }
      statusCode = 500
    } else {
      let data = {
        title: title,
        genre: genre,
        path: "/movies/" + originalname,
        createdAt: new Date(),
      }
      Movie.create(data)
    }
    response.writeHead(statusCode, options)
    response.write(JSON.stringify(data))
    response.end()
  })
}
const getMovie = (request, response) => {
  let statusCode = 200
  let data = {}
  Movie.find()
    .where("deleted_at")
    .equals(null)
    .then(movies => {
      if (movies.length > 0) {
        data = { movies }
      } else {
        data = { error: "No Movies Found" }
      }
      response.writeHead(statusCode, options)
      response.write(JSON.stringify(data))
      response.end()
    })
}
const MovieController = {
  createMovie,
  getMovie,
}
module.exports = MovieController
