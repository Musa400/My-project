import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken'

export const verfiytokens = (req,res,next) =>{
    const token = req.cookies.access_token;
    if(!token) return next(errorHandler(401, 'unauthroized'));
    jwt.verify(token, process.env.JWT_SECRET, (err,user) =>{
     if(err) return(errorHandler(403, 'Forbidden'));

     req.user = user;
     next()
    })
}