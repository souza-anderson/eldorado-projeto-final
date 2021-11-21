import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

export default async (request: Request, response: Response, next: NextFunction) => {
    try {
        const schema = yup.object().shape({
            name: yup.string().required().trim(),
            synopsis: yup.string().required().trim(),
            poster: yup.string().required().trim(),
            release_year: yup.date().required(),
            billing: yup.number().required(),
            genre: yup.object().required()
        });

        await schema.validate(request.body, { abortEarly: false });

        return next();
    } catch(error: any) {
        return response.status(400).json({
            status: "fail",
            message: error.errors
        })
    } 
}