
import gql from '../lib/graphql';

export default ({ query }, context, cb) => {
  gql(query)
    .then((response) => cb(null, response))
    .catch((error) => cb(error));
};
