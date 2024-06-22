const BaseError = require("./base.error")

const {StatusCodes} = require("http-status-codes");
class BadRequest extends BaseError{
    constructor(propertytName, details){
        super("BadRequest", StatusCodes.BAD_REQUEST, `Invalid structure for ${propertytName} provided`)
    }
}

module.exports = BadRequest