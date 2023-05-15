import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";

export const isAuthenticated = async (req,res,next) => {
    const {token} = req.cookies;

    if(!token)
        return next(new ErrorHandler(`Error: Login First`, 404));
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded._id;
    if(!req.user)
        return next(new ErrorHandler(`Error: Invalid Token`, 401));
    next();
};