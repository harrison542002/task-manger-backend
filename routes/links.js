const express = require('express')
const routes = express.Router()
const { getAllTasks, createTask, getSingleTask, updateTask, deleteTask } = require('../controllers/tasks')

routes.route("/").get(getAllTasks).post(createTask)
routes.route("/:id").get(getSingleTask).patch(updateTask).delete(deleteTask)

module.exports = routes