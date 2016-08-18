
import {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

import UserType from './type';
import validate from './validate';
import resolves from './resolves';

export default {
  users: {
    type: new GraphQLList(UserType),
    description: 'List of users',
    resolve() {
      return resolves.getAll();
    },
  },
  user: {
    type: UserType,
    description: 'Get a User by username',
    args: {
      username: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolv(source, args) {
      return validate(args).then(() => resolves.get(args.username));
    },
  },
};
