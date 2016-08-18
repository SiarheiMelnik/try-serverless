
const validate = {
  username(username) {
    const re = /^[a-z0-9_-]{3,16}$/;
    if (!re.test(username)) return Promise.reject('invalid username');
    return Promise.resolve();
  },
  password(password) {
    const re = /[a-zA-Z]\w{3,14}$/;
    if (!re.test(password)) return Promise.reject('invalid password');
    return Promise.resolve();
  },
  email(email) {
    const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!re.test(email)) return Promise.reject('invalid email');
    return Promise.resolve();
  },
  name: () => {},
  token: () => {},
};


export default (data) => {
  Object.keys(data).forEach((d) => { validate[d](data[d]); });
  return Promise.resolve();
};
