const mongoose = require('mongoose')

const Tasks = new mongoose.Schema({
    name: {
        //validation
        type: String,
        required: true,
        maxlength: [20, "Cannot accept more than 20 characters"],
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
})

const Model = mongoose.model('Task', Tasks)

module.exports = Model