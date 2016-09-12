
const gql = require('./lib/graphql');

exports.data = (event, context) => {
  gql(event.query)
    .then(res => context.succeed(res))
    .catch(error => context.fail(error));
};
