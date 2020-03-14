import { BaseEntity, ObjectLiteral } from "typeorm"
import Pagination from "@Contracts/Pagination"
import PaginationInput from "@Inputs/Pagination/PaginationInput"

export default class ExtendedEntity extends BaseEntity {
  public static async paginate(
    skip: number,
    take: number,
    query?: ObjectLiteral
  ) {
    const [entities, count] = await this.findAndCount({
      ...query,
      skip,
      take
    })

    return [
      new Pagination({ skip, take, count, has_next: skip + take < count }),
      ...entities
    ]
  }

  public static toPaginated(
    entities: ExtendedEntity[],
    { skip, take, count }: PaginationInput & { count: number }
  ) {
    return [
      new Pagination({ skip, take, count, has_next: skip + take < count }),
      ...entities
    ]
  }
}
