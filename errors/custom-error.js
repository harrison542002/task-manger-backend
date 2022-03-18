//Create subclass of Error Class
class CustomErrorAPI extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

//Create instance
const createCustomError = (msg, statusCode) => {
    return new CustomErrorAPI(msg, statusCode)
}

module.exports = { createCustomError, CustomErrorAPI }