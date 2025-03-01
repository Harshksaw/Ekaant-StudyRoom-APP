const BaseError = require("./base.error")

const {StatusCodes} = require("http-status-codes");
class NotFound extends BaseError{
    constructor(resourcetName, resourceValue){
        super("NotFound", StatusCodes.NOT_FOUND, `Resource ${resourcetName} with value ${resourceValue} not found`,{
            resourcetName,
            resourceValue
        });
    }
}

module.exports = NotFound