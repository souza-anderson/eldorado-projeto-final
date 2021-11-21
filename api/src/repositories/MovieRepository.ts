import { Movie } from "../entities/Movie";
import { EntityRepository, Repository } from "typeorm";
import { PaginationAwareObject } from "typeorm-pagination/dist/helpers/pagination";

@EntityRepository(Movie)
class MovieRepository extends Repository<Movie> {
  public findAll(): Promise<PaginationAwareObject> {
    const query = this.createQueryBuilder("n");
    return query.paginate();
  }

  public findById(id: number): Promise<Movie | undefined> {
    return this.findOne(id, { relations: ["genre"] });
  }

  public findByName(name: string): Promise<Movie | undefined> {
    return this.findOne({ name });
  }
}

export default MovieRepository;