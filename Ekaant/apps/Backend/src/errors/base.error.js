class BaseError extends Error{
    constructor(name, statusCode, description, details){
        super(description);
        this.name = name;
        this.statusCode = statusCode;
        this.details = details;

        Error.captureStackTrace(this);

        // console.log(this.stack);
    }
}

class NotFoundError extends BaseError{
    constructor(description, details){
        super("NotFoundError", 404, description, details);
    }
}   

module.exports = BaseError;
