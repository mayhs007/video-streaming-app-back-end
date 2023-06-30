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
const readVideos = (request, response) => {
  //Pagination
  let limit = parseInt(request.query.limit) || 50
  let bucket = getBucket()
  try {
    bucket
      .find({ contentType: "video/mp4" })
      .toArray((err, files) => {
        console.log(files)
        if (!files || files.length === 0) {
          return {
            err: "no files exist",
          }
        } else {
          return { files }
        }
      })
      .then(data => {
        response.status(200).json({ videos: data })
        response.end()
      })
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
        if (result && result.length > 0) {
          let video = result[0]
          let start = 0
          let end = video.length - 1
          let contentLength = end - start + 1
          // Content-Range: <unit> <range-start>-<range-end>/<size>
          const headers = {
            "Content-Range": `bytes ${start}-${end}/${video.length}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-type": video.contentType,
          }
          // 206 marks the Partial Data
          response.writeHead(206, headers)
          const downloadStream = bucket.openDownloadStreamByName(fileName, { start })
          downloadStream.pipe(response)
          downloadStream.on("end", stream => {
            downloadStream.unpipe(response)
            response.end()
          })
        }
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
  readVideos,
}
module.exports = VideoController
