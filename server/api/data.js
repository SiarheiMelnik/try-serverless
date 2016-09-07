
const gql = require('./lib/graphql');

exports.handler = (event, context) => {
  gql(event.query)
    .then(res => context.succeed(res))
    .catch(error => context.fail(error));
};
