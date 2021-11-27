import { Request, Response } from "express";
import GenreRepository from "../repositories/GenreRepository";
import { getCustomRepository } from "typeorm";
import { Genre } from "../entities/Genre";

class GenreController {
  async index(request: Request, response: Response) {
    try {
      const genreRepository = getCustomRepository(GenreRepository);

      const genres = await genreRepository.findAll();

      return response.status(200).json({
        status: "success",
        data: {
          genres
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
      const genreRepository = getCustomRepository(GenreRepository);
      const { id } = request.params;

      const genre = await genreRepository.findById(Number(id));
      if (typeof genre === "undefined") {
        return response.status(404).json({
          status: "fail",
          data: {
            genre: "genre not found"
          }
        });
      }

      return response.status(200).json({
        status: "success",
        data: {
          genre
        }
      });

    } catch(error) {
      return response.status(400).json({
        status: "error",
        message: error.message
      })
    }

  }

  async create(request: Request, response: Response) {
    try{
      const genreRepository = getCustomRepository(GenreRepository);

      const { name } = request.body;

      const gerneAlreadyExists = await genreRepository.findByName(name); 

      if (typeof gerneAlreadyExists !== "undefined") {
        return response.status(409).json({
          status: "fail",
          data: {
            genre: "genre already exists"
          }
        })
      }  

      let genre = new Genre();
      genre.name = name;

      genre = await genreRepository.save(genre);

      return response.status(201).json({
        status: "success",
        data: {
          genre
        }
      })
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
      const genreRepository = getCustomRepository(GenreRepository);
      let genre = await genreRepository.findById(Number(id));

      if (typeof genre === "undefined") {
        return response.status(404).json({
          status: "fail",
          data: {
            genre: "genre not found"
          }
        });
      }

      const { name } = request.body;

      genre.name = name;

      genre = await genreRepository.save(genre);

      return response.status(200).json({
        status: "success",
        data: {
          genre
        }
      });
    } catch (error) {
      return response.status(400).json({
        status: "error",
        message: error.message
      })
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const genreRepository = getCustomRepository(GenreRepository);
      const genre = await genreRepository.findById(Number(id));

      if (typeof genre === 'undefined') {
        return response.status(404).json({
          status: "fail",
          data: {
            genre: "genre not found"
          }
        })
      }

      await genreRepository.delete(genre);

      return response.status(200).json({
        status: "success",
        data: null
      });

    } catch (error) {
      response.status(400).json({
        status: "error",
        message: error.message
      })
    }
  }
  
}

export default new GenreController();