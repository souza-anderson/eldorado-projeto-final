import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

export default async (request: Request, response: Response, next: NextFunction) => {
    try {
        const schema = yup.object().shape({
            name: yup.string().required().trim(),
            email: yup.string().required().trim(),
            password: yup.string().required().trim()
        });

        await schema.validate(request.body, { abortEarly: false });

        return next();
    } catch(error: any) {
        return response.status(400).json({
            status: "fail",
            message: error.errors
        });
    } 
}