import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { createTransport } from "nodemailer";

import mailerConfig from "../config/mailer";
import hostConfig from "../config/host";

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
        message: error.message
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
            user: "user not found"
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
        message: error.message
      });
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
            user: "user already exists"
          }
        })
      }  

      let user = new User();
      user.name = name;
      user.email = email;
      user.password = password;

      user = await userRepository.save(user);

      if (typeof user !== "undefined") {
        const transport = createTransport({
          host: mailerConfig.mailHost,
          port: Number(mailerConfig.mailPort),
          auth: {
            user: mailerConfig.mailUser,
            pass: mailerConfig.mailPass
          }
        });

        const mailBodyText = `Olá, ${user.name},\n\nBem-vindo à plataforma EldoradoFlix`;
        const mailbodyHtml = `Olá, <strong>${user.name}
          </strong>,
          <br>
          <p>
            Bem-vindo a nossa plataforma EldoradoFlix. 
            Aqui você pode cadastrar seus vídeos favoritos disponíveis no perfil do YouTube do Instituto Eldorado.
          </p>
          <br>
          <a>Acesse agora clicando <a href='http://${hostConfig.host}:${hostConfig.port}'>AQUI</a>
          
          
          `;
        let info = await transport.sendMail({
            to: "new-user@email.com",
            from: mailerConfig.mailFrom,
            replyTo: mailerConfig.mailReplyTo,
            subject: "EldoradoFlix - Parabéns",
            text: mailBodyText,
            html: mailbodyHtml
        });

        return response.status(201).json({
          status: "success",
          data: {
            user,
            info
          }
        });
      }

      
    } catch(error) {
      return response.status(400).json({
        status: "error",
        message: error.message
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
            user: "user not found"
          }
        });
      }

      const { name, email, password } = request.body;

      user.name = name;
      user.email = email;
      user.password = password;

      user = await userRepository.save(user);

      const transport = createTransport({
        host: mailerConfig.mailHost,
        port: Number(mailerConfig.mailPort),
        auth: {
          user: mailerConfig.mailUser,
          pass: mailerConfig.mailPass
        }
      });

      const mailBodyText = `Olá, ${user.name},\n\n`;
      const mailbodyHtml = `Olá, <strong>${user.name}
        </strong>,
        <br>
        <p>
          Seus dados foram atualizados na nossa plataforma EldoradoFlix.
        </p>
        <br>
        <a>Acesse agora clicando <a href='http://${hostConfig.host}:${hostConfig.port}'>AQUI</a>
        
        
        `;
      let info = await transport.sendMail({
          to: "new-user@email.com",
          from: mailerConfig.mailFrom,
          replyTo: mailerConfig.mailReplyTo,
          subject: "EldoradoFlix - Dados atualizados",
          text: mailBodyText,
          html: mailbodyHtml
      });

      return response.status(200).json({
        status: "success",
        data: {
          user,
          info
        }
      });
    } catch (error) {
      return response.status(400).json({
        status: "error",
        message: error.message
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
            user: "user not found"
          }
        })
      }

      await userRepository.delete(user);

      return response.status(200).json({
        status: "success",
        data: null
      })

    } catch (error) {
      response.status(400).json({
        status: "error",
        message: error.message
      });
    }
  }  
}

export default new UserController();