import { Request, Response } from "express";
import MovieRepository from "../repositories/MovieRepository";
import { getCustomRepository } from "typeorm";
import { Movie } from "../entities/Movie";

class MovieController {
  async index(request: Request, response: Response) {
    try {
      const movieRepository = getCustomRepository(MovieRepository);

      const movies = await movieRepository.findAll();

      return response.status(200).json({
        status: "success",
        data: {
          movies
        }
      })
    } catch(error) {
      return response.status(400).json({
        status: "error",
        error
      })
    }
  }

  async view(request: Request, response: Response) {
    try {
      const movieRepository = getCustomRepository(MovieRepository);
      const { id } = request.params;

      const movie = await movieRepository.findById(Number(id));
      if (typeof movie === "undefined") {
        return response.status(404).json({
          status: "fail",
          data: {
            title: "Movie not found"
          }
        });
      }

      return response.status(200).json({
        status: "success",
        data: {
          movie
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
      const movieRepository = getCustomRepository(MovieRepository);

      const {
        name,
        synopsis,
        poster,
        release_year,
        billing,
        genre
      } = request.body;

      const movieAlreadyExists = await movieRepository.findByName(name); 

      if (typeof movieAlreadyExists !== "undefined") {
        return response.status(409).json({
          status: "fail",
          data: {
            title: "Movie already exists"
          }
        })
      }  

      let movie = new Movie();
      movie.name = name;
      movie.synopsis = synopsis;
      movie.poster = poster;
      movie.release_year = release_year;
      movie.billing = billing;
      movie.genre = genre;

      movie = await movieRepository.save(movie);

      return response.status(201).json({
        status: "success",
        data: {
          movie
        }
      })
    } catch(error) {
      return response.status(400).json({
        status: "error",
        error
      })
    }

  }

  async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const movieRepository = getCustomRepository(MovieRepository);
      let movie = await movieRepository.findById(Number(id));

      if (typeof movie === "undefined") {
        return response.status(404).json({
          status: "fail",
          data: {
            title: "Movie not found"
          }
        });
      }

      const {
        name,
        synopsis,
        poster,
        release_year,
        billing,
        genre
      } = request.body;

      movie.name = name;
      movie.synopsis = synopsis;
      movie.poster = poster;
      movie.release_year = release_year;
      movie.billing = billing;
      movie.genre = genre;

      movie = await movieRepository.save(movie);

      return response.status(200).json({
        status: "success",
        data: {
          movie
        }
      });
    } catch (error) {
      return response.status(400).json({
        status: "error",
        error
      })
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const movieRepository = getCustomRepository(MovieRepository);
      const movie = await movieRepository.findById(Number(id));

      if (typeof movie === 'undefined') {
        return response.status(404).json({
          status: "fail",
          data: {
            title: "Movie not found"
          }
        })
      }

      await movieRepository.delete(movie);

      return response.status(200).json({
        status: "success",
        data: {
          title: "Movie deleted successfuly"
        }
      })

    } catch (error) {
      response.status(400).json({
        status: "error",
        error
      })
    }
  }
  
}

export default new MovieController();