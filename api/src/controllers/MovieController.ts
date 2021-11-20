import { Request, Response } from "express";
import MovieRepository from "../repositories/MovieRepository";
import { getCustomRepository } from "typeorm";
import { Movie } from "src/entities/Movie";

class MovieController {
  async index(request: Request, response: Response) {
    const movieRepository = getCustomRepository(MovieRepository);

    const movies = await movieRepository.findAll();

    return response.json(movies);
  }

  async create(request: Request, response: Response) {
    const movieRepository = getCustomRepository(MovieRepository);

    const {
      name,
      synopsis,
      poster,
      release_year,
      billing,
      genre
    } = request.body;

    let movie = new Movie();
    movie.name = name;
    movie.synopsis = synopsis;
    movie.poster = poster;
    movie.release_year = release_year;
    movie.billing = billing;
    movie.genre = genre;

    movie = await movieRepository.save(movie);

    return response.json(movie);

  }

  async view(request: Request, response: Response) {
    const movieRepository = getCustomRepository(MovieRepository);

    const { id } = request.params;

    const movie = await movieRepository.findById(Number(id));

    return response.json(movie);

  }
}

export default new MovieController();