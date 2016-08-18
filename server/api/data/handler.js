
import gql from '../lib/graphql';

export default ({ query }, context) => {
  gql(query)
    .then(res => context.succeed(res))
    .catch(error => context.fail(error));
};
