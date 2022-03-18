const connect = require('./db/connect')
const express = require('express')
const app = express()
const tasks = require('./routes/links')
const notfound = require('./middlewares/notfound')
const errorHandler = require('./middlewares/error-handler')
//dot evn in order to veil our database or any resources in github repo
require('dotenv').config()

//middleware
app.use(express.static('./public'))
app.use(express.json())
//routes
app.use('/api/v1/tasks', tasks)
app.use(notfound)
app.use(errorHandler)

//port handle if there is any port host set
const port = process.env.PORT || 3000

const starter = async () => {
    try {
        //invoke env variable 
        await connect(process.env.MONGO_URL)
        app.listen(port,
            console.log("Server is listening port 3000..."));
    } catch (error) {
        console.log(error)
    }
}

starter()