import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

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
                        title: "User not found"
                    }
                });
            }

            const passwordIsValid = await compare(password, user.password);
            if (!passwordIsValid) {
                return response.status(401).json({
                    status: "fail",
                    data: {
                        title: "Credentials wrong. Try again!"
                    }
                });
            }

            // delete user.password;
            // delete user.created_at;
            // delete user.updated_at;

            const token = sign(
                { user },
                "secrectkey",
                {  expiresIn: "1d"}
            );

            return response.status(200).json({
                status: "success",
                token
            })
        } catch(error) {
            return response.status(400).json({
                status: "error",
                error
            });
        }
    }
}

export default new AuthController();