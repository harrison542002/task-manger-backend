const Task = require('../models/tasks')

//Refactoring codes by middleware
const asynWrapper = require('../middlewares/async')

//Error handler middleware
const { createCustomError } = require('../errors/custom-error')

//Get method
const getAllTasks = asynWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
})

//Post method
const createTask = asynWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })

})

//Get specific method
const getSingleTask = asynWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })
    if (!task) {
        return next(createCustomError(`No item with that id ${taskID}`, 404))
    }
    res.status(200).json({ task })

})

//Delete method
const deleteTask = asynWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndDelete({ _id: taskID })
    if (!task) {
        return next(createCustomError(`No item with that id ${taskID}`, 404))
    }
    res.status(200).json({ task })

})

//Patch method
const updateTask = asynWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        //Note to add runValidator to true, otherwise, validation will not work
        new: true,
        runValidators: true
    })
    if (!task) {
        return next(createCustomError(`No item with that id ${taskID}`, 404))
    }
    res.status(200).json({ task })

})

module.exports = { getAllTasks, createTask, getSingleTask, updateTask, deleteTask }