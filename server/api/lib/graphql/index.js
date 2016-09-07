
const _ = require('lodash');
const graphql = require('graphql').graphql;
const Schema = require('./schema');

global.Promise = require('bluebird');

module.exports = (query) => {
  // patch to allow queries from GraphiQL
  // like the initial introspectionQuery
  if (query && _.has(query, 'query')) {
    query = query.query.replace('\n', ' ', 'g');
  }

  return graphql(Schema, query);
};
