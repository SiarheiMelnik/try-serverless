
import _ from 'lodash';
import { graphql } from 'graphql';
import Schema from './schema';


global.Promise = require('bluebird');

export default (query) => {
  // patch to allow queries from GraphiQL
  // like the initial introspectionQuery
  if (query && _.has(query, 'query')) {
    query = query.query.replace('\n', ' ', 'g');
  }

  return graphql(Schema, query);
};
