import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth";

const Auth = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { authorization } = request.headers;
        
        if (typeof authorization === "undefined") {
            return response.status(401).json({
                status: "fail",
                data: {
                    title: "Unauthorized access"
                }
            });
        }

        const [, token] = authorization.split(" ");
        
        jwt.verify(token, authConfig.secretKey as string);
        
        return next();
    } catch(error) {
        return response.status(400).json({
            status: "error",
            data: {
                error
            }
        });
    }
}

export default Auth;