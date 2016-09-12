
const graphql = require('graphql');
const _ = require('lodash');

const queries = {};
const mutations = {};

// add your collections here
const collections = [
  'users',
];

// load collections queries and muataions
collections.forEach(name => {
  _.assign(queries, require(`./collections/${name}/queries`).default);
  _.assign(mutations, require(`./collections/${name}/mutations`).default);
});

const Queries = new graphql.GraphQLObjectType({
  name: 'Root',
  description: 'Root of the Schema',
  fields: queries,
});

const Mutations = new graphql.GraphQLObjectType({
  name: 'Mutations',
  fields: mutations,
});

module.exports = new graphql.GraphQLSchema({
  query: Queries,
  mutation: Mutations,
});
