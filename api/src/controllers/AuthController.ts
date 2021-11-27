import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";

class AuthController {
    async auth(request: Request, response: Response) {
        try {
            const { email, password } = request.body;
            const userRepository = getCustomRepository(UserRepository);

            const user = await userRepository.findByEmail(email);
            
            if (typeof user === "undefined") {
                return response.status(404).json({
                    status: "fail",
                    data: {
                        user: "user not found"
                    }
                });
            }

            const isValidPassword = await compare(password, user.password);
            if (!isValidPassword) {
                return response.status(401).json({
                    status: "fail",
                    data: {
                        crendentials: "credentials wrong. Try again!"
                    }
                });
            }

            // delete user.password;
            // delete user.created_at;
            // delete user.updated_at;
            const payload = {
                name: user.name,
                email: user.email
            };

            const token = sign(
                payload,
                authConfig.secretKey as string,
                {  expiresIn: "1d"}
            );

            return response.status(200).json({
                status: "success",
                data: {
                    token
                }
            })
        } catch(error) {
            return response.status(400).json({
                status: "error",
                message: error.message
            });
        }
    }
}

export default new AuthController();