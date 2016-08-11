'use strict';

global.Promise = require('bluebird');

const { graphql } = require('graphql');
const Schema = require('./schema');

module.exports = (query) => {
  //
  // patch to allow queries from GraphiQL
  // like the initial introspectionQuery
  if (query && {}.hasOwnProperty.call(query, 'query')) {
    query = query.query.replace('\n', ' ', 'g');
  }

  return graphql(Schema, query);
};
