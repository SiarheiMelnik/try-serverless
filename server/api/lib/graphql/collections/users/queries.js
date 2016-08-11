'use strict';

const { GraphQLList, GraphQLString, GraphQLNonNull } = require('graphql');

const UserType = require('./type');
const validate = require('./validate');
const resolves = require('./resolves');

module.exports = {
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
    resolve(source, args) {
      return validate(args).then(() => resolves.get(args.username));
    },
  },
};
