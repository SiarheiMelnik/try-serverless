
const graphql = require('graphql');

const UserType = require('./type');
const validate = require('./validate');
const resolves = require('./resolves');

const GraphQLList = graphql.GraphQLList;
const GraphQLString = graphql.GraphQLString;
const GraphQLNonNull = graphql.GraphQLNonNull;

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
    resolv(source, args) {
      return validate(args).then(() => resolves.get(args.username));
    },
  },
};
