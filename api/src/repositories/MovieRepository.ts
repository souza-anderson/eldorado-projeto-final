import { Movie } from "../entities/Movie";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Movie)
class MovieRepository extends Repository<Movie> {
  public findAll(): Promise<Movie[]> {
    const query = this.createQueryBuilder("n");
    return query.getMany();
  }

  public findById(id: number): Promise<Movie | undefined> {
    return this.findOne(id, { relations: ["genre"] });
  }
}

export default MovieRepository;