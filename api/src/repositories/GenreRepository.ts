import { Genre } from "../entities/Genre";
import { EntityRepository, Repository } from "typeorm";
import { PaginationAwareObject } from "typeorm-pagination/dist/helpers/pagination";

@EntityRepository(Genre)
class GenreRepository extends Repository<Genre> {
  public findAll(): Promise<PaginationAwareObject> {
    const query = this.createQueryBuilder("n");
    return query.paginate();
  }

  public findById(id: number): Promise<Genre | undefined> {
    return this.findOne(id);
  }

  public findByName(name: string): Promise<Genre | undefined> {
    return this.findOne({ name });
  }
}

export default GenreRepository;