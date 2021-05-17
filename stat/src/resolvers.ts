import { User } from "@resolvers/User";
import { Users } from "@resolvers/Users";

export const resolvers = {
  Query: {
    user: User,
    users: Users
  }
}