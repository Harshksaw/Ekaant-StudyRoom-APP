const BaseError = require("./base.error")

const {StatusCodes} = require("http-status-codes");
class InternalServerError extends BaseError{
    constructor(propertytName, details){
        super("InternalServerError", StatusCodes.INTERNAL_SERVER_ERROR, `Something wen Wrong!! ${propertytName} provided`)
    }
}

module.exports = InternalServerError