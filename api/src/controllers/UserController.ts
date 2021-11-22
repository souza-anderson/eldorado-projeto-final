import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";

class UserController {
  async index(request: Request, response: Response) {
    try {
      const userRepository = getCustomRepository(UserRepository);

      const users = await userRepository.findAll();

      return response.status(200).json({
        status: "success",
        data: {
          users
        }
      })
    } catch(error) {
      return response.status(400).json({
        status: "error",
        error
      });
    }
  }

  async view(request: Request, response: Response) {
    try {
      const userRepository = getCustomRepository(UserRepository);
      const { id } = request.params;

      const user = await userRepository.findById(Number(id));
      if (typeof user === "undefined") {
        return response.status(404).json({
          status: "fail",
          data: {
            title: "User not found"
          }
        });
      }

      return response.status(200).json({
        status: "success",
        data: {
          user
        }
      });

    } catch(error) {
      return response.status(400).json({
        status: "error",
        error
      })
    }

  }

  async create(request: Request, response: Response) {
    try{
      const userRepository = getCustomRepository(UserRepository);

      const { name, email, password } = request.body;

      const userAlreadyExists = await userRepository.findByName(name); 

      if (typeof userAlreadyExists !== "undefined") {
        return response.status(409).json({
          status: "fail",
          data: {
            title: "User already exists"
          }
        })
      }  

      let user = new User();
      user.name = name;
      user.email = email;
      user.password = password;

      user = await userRepository.save(user);

      return response.status(201).json({
        status: "success",
        data: {
          user
        }
      })
    } catch(error) {
      return response.status(400).json({
        status: "error",
        error
      });
    }

  }

  async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const userRepository = getCustomRepository(UserRepository);
      let user = await userRepository.findById(Number(id));

      if (typeof user === "undefined") {
        return response.status(404).json({
          status: "fail",
          data: {
            title: "User not found"
          }
        });
      }

      const { name, email, password } = request.body;

      user.name = name;
      user.email = email;
      user.password = password;

      user = await userRepository.save(user);

      return response.status(200).json({
        status: "success",
        data: {
          user
        }
      });
    } catch (error) {
      return response.status(400).json({
        status: "error",
        error
      });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const userRepository = getCustomRepository(UserRepository);
      const user = await userRepository.findById(Number(id));

      if (typeof user === 'undefined') {
        return response.status(404).json({
          status: "fail",
          data: {
            title: "User not found"
          }
        })
      }

      await userRepository.delete(user);

      return response.status(200).json({
        status: "success",
        data: {
          title: "User deleted successfuly"
        }
      })

    } catch (error) {
      response.status(400).json({
        status: "error",
        error
      });
    }
  }  
}

export default new UserController();