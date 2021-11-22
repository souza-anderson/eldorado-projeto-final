import { User } from "../entities/User";
import { EntityRepository, Repository } from "typeorm";
import { PaginationAwareObject } from "typeorm-pagination/dist/helpers/pagination";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public findAll(): Promise<PaginationAwareObject> {
    const query = this.createQueryBuilder("n");
    return query.paginate();
  }

  public findById(id: number): Promise<User | undefined> {
    return this.findOne(id);
  }

  public findByName(name: string): Promise<User | undefined> {
    return this.findOne({ name });
  }
}

export default UserRepository;