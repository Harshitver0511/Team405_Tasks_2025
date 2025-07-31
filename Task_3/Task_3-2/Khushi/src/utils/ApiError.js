class ApiError extends Error{
    constructor(
        statusCode,
        errors = [],
        message = "Something went wrong!",
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors
    }
}
export {ApiError}