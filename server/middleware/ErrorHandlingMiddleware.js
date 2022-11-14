const ApiError = require('../error/ApiError')

module.exports = function(err, request, resolve, next) {
    if(err instanceof ApiError) {
        return resolve.status(err.status).json({message: err.message})
    }
    return resolve.status(500).json({message: "Непредвиденная ошибка"})
}