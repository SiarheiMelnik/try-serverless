
import _ from 'lodash';
import { Lambda } from 'aws-sdk';

const lambda = new Lambda({
  region: process.env.SERVERLESS_REGION,
  sessionToken: process.env.AWS_SESSION_TOKEN,
});

/**
 * Invokes the project functions
 * @param {string} name The function name
 * @param {object} data Optional event data
 * @param {function} responseHandler Optional callback, if specified the invocation type
 * will be RequestResponse (synchronous), otherwise it will be 'Event' (async).
 */

export default (name, data, responseHandler) => {
  if (arguments.length === 2 && _.isFunction(arguments[1])) {
    responseHandler = arguments[1];
    data = {};
  }

  const FunctionName = `${process.env.SERVERLESS_PROJECT}-${name}`;
  const InvocationType = responseHandler ? 'RequestResponse' : 'Event';

  const params = {
    FunctionName,
    InvocationType,
    LogType: 'None',
    Payload: new Buffer(JSON.stringify(data)),
    Qualifier: process.env.SERVERLESS_STAGE,
  };

  return Promise
    .fromCallback(cb => lambda.invoke(params, cb))
    .then(reply => reply.Payload ? JSON.parse(reply.Payload) : {})
    .then(responseHandler);
};
