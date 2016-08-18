import jwt from 'jsonwebtoken';

const authorize = (token, requiredPermissions) => {
  let user;
  // make sure user is logged in
  try {
    user = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
  } catch (e) {
    return Promise.reject('Invalid Token');
  }

  // make sure user have the required permissions
  requiredPermissions.forEach((p) => {
    if (user.permissions.indexOf(p) === -1) {
      return Promise.reject('User is unauthorized to take this action');
    }
    return true;
  });

  return Promise.resolve(user);
};

const authenticate = (user) => jwt.sign(user, process.env.AUTH_TOKEN_SECRET);

export default {
  authenticate,
  authorize,
};
