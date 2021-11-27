import { Genre } from "../entities/Genre";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Genre)
class GenreRepository extends Repository<Genre> {
  public findAll(): Promise<Genre[]> {
    const query = this.createQueryBuilder("n");
    return query.getMany();
  }

  public findById(id: number): Promise<Genre | undefined> {
    return this.findOne(id);
  }

  public findByName(name: string): Promise<Genre | undefined> {
    return this.findOne({ name });
  }
}

export default GenreRepository;