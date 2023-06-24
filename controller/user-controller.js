const User = require("../model/user_model")
let options = {
  "Content-type": "application/json",
}
// function createUser(request, response) {}
const createUser = (request, response) => {
  let statusCode = 200
  let data = {}
  let { user } = request.body
  User.find({ mobile: user.mobile }).then(users => {
    if (users.length === 0) {
      User.create(user)
      User.save()
      data = { success: "User created successfully" }
    } else {
      data = { error: "User already exists" }
      statusCode = 500
    }
    response.writeHead(statusCode, options)
    response.write(JSON.stringify(data))
    response.end()
  })
}

const getAllUsers = (request, response) => {
  let statusCode = 200
  let data = {}
  User.find().then(users => {
    if (users.length > 0) {
      data = {
        users: users,
      }
    } else {
      statusCode = 500
      data = { error: "No Users found" }
    }
    response.writeHead(statusCode, options)
    response.write(JSON.stringify(data))
    response.end()
  })
}
//Read User
const readUser = (request, response) => {
  let requestMobile = request.params.mobile
  let statusCode = 200
  let data = {}
  User.find({ mobile: requestMobile })
    .where("deleted_at")
    .equals(null)
    .then(users => {
      if (users.length > 0) {
        data = {
          users: users,
        }
      } else {
        statusCode = 500
        data = { error: "No Users found" }
      }
      response.writeHead(statusCode, options)
      response.write(JSON.stringify(data))
      response.end()
    })
}

//Update User
const updateUser = (request, response) => {
  let requestMobile = request.params.mobile
  let condition = {
    mobile: requestMobile,
  }
  let { user } = request.body
  let statusCode = 200
  let data = {}
  User.findOneAndUpdate(condition, user, { new: true }).then(updatedUser => {
    if (updatedUser) {
      data = { users: [updatedUser] }
    } else {
      data = { error: "No Users Found" }
      statusCode = 500
    }
    response.writeHead(statusCode, options)
    response.write(JSON.stringify(data))
    response.end()
  })
}

const deleteUser = (request, response) => {
  let requestMobile = request.params.mobile
  let statusCode = 200
  let data = {}
  let condition = { mobile: requestMobile }
  let updateUser = { deleted_at: new Date() }
  let options = { new: true }
  User.findOneAndUpdate(condition, updateUser, options).then(updatedUser => {
    if (updatedUser) {
      data = { success: "User deleted" }
    } else {
      data = { error: "No Users Found" }
      statusCode = 500
    }
    response.writeHead(statusCode, options)
    response.write(JSON.stringify(data))
    response.end()
  })
}

const userController = {
  createUser,
  readUser,
  updateUser,
  deleteUser,
  getAllUsers,
}
module.exports = userController
