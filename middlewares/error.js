//Creating new error handler class so that we can
//provide message as well as status code
//while calling next(new ErrorHandler(message,statusCode))
class ErrorHandler extends Error {
    constructor(message,statusCode) {
        super(message);
        this.statusCode =  statusCode; 
        //Here "Error" is the parent class and super
        //is the constructor of the parent class 
        //in this case the parent class is Error.
    
        };
    };
    export const errorMiddleware = (err,req,res,next) => {
        err.message = err.message || "Internal Server Error";
        err.statusCode = err.statusCode || 500;    
        
        res.status(err.statusCode).json({
            status: false,
            message: err.message,
        });
    };
    
    export default ErrorHandler;