import { Arg, Query, Resolver } from "type-graphql";
import { BaseEntity } from "typeorm";

export const createResolver = (
  suffix: string,
  entity: typeof BaseEntity
): any => {
  @Resolver()
  class BaseResolver {
    @Query(() => [entity], {
      name: `${suffix}s`,
      complexity: ({ args }) => args.limit,
    })
    getall() {
      return entity.find();
    }

    @Query(() => entity, {
      name: `${suffix}`,
      complexity: ({ args }) => args.limit,
    })
    get(@Arg("id") id: string) {
      return entity.findOne(id);
    }
  }

  return BaseResolver;
};
