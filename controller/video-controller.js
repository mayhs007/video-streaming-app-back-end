const { request } = require("express")
const Video = require("../model/video-model")
const { bucket, gridFsBucket, getBucket } = require("../db-connection")
let options = {
  "Content-type": "application/json",
}

const createVideo = (request, response) => {
  let statusCode = 200
  let data = {}
  let { originalname } = request.file
  let { title, genre } = request.body
  console.log(request.file)
  Video.find({ title: originalname }).then(videos => {
    if (videos.length > 0) {
      data = { error: "Video already exists" }
      statusCode = 500
    } else {
      let data = {
        title: title,
        genre: genre,
        path: "/videos/" + originalname,
        createdAt: new Date(),
      }
      Video.create(data)
    }
    response.writeHead(statusCode, options)
    response.write(JSON.stringify(data))
    response.end()
  })
}
const getVideo = (request, response) => {
  let statusCode = 200
  let data = {}
  Video.find()
    .where("deleted_at")
    .equals(null)
    .then(videos => {
      if (videos.length > 0) {
        data = { videos }
      } else {
        data = { error: "No Videos Found" }
      }
      response.writeHead(statusCode, options)
      response.write(JSON.stringify(data))
      response.end()
    })
}

const uploadVideo = (request, response) => {
  try {
    response.json({ message: "File uploaded successfully" })
  } catch (error) {
    response.json({ error: error.message })
  }
}
const readVideo = (request, response, str) => {
  let fileName = request.params.fileName
  let bucket = getBucket()
  try {
    bucket
      .find({ filename: fileName })
      .toArray()
      .then(result => {
        bucket.openDownloadStreamByName(fileName).pipe(response)
      })
  } catch (error) {
    response.json({ error: error.message })
  }
}
const VideoController = {
  createVideo,
  getVideo,
  uploadVideo,
  readVideo,
}
module.exports = VideoController
