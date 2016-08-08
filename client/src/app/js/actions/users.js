import 'whatwg-fetch';
import _ from 'lodash';
import { push } from 'react-router-redux';

import { API_URL } from './index';
import {resetError} from './error';

import {
  ERROR,
  GET_USERS,
  GET_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  LOGIN_USER,
  LOGOUT_USER
} from './constants';

export function createUser(user) {
  const query = { "query":
    `mutation createNewUser {
      user: createUser (
        name: "${user.name}",
        username: "${user.username}"
        email: "${user.email}"
        password: "${user.password}"
      )
      {
        id
        name
        username
        email
      }
    }`
  };

  return (dispatch) => fetch(`${API_URL}/data/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: CREATE_USER,
    payload: json
  }))
  .then(() => dispatch(push('/')))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function getUsers() {
  const query = { "query":
    `{
      users {
        username
        name
        email
        token
      }
    }`
  };

  return (dispatch) => fetch(`${API_URL}/data/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: GET_USERS,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function getUser(username) {
  const query = { "query":
    `{
      user(username: "${username}")
      {
        id
        name
        username
        email,
        token
      }
    }`
  };

  return (dispatch) => fetch(`${API_URL}/data/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: GET_USER,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function updateUser(user) {
  const query = { "query":
    `mutation updateExistingUser {
      user: updateUser (
        name: "${user.name}"
        email: "${user.email}"
        password: "${user.password}"
        token: "${user.token}"
      )
      {
        id,
        name,
        username,
        email,
        token
      }
    }`
  };

  return (dispatch) => fetch(`${API_URL}/data/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(payload => dispatch({payload, type: UPDATE_USER}))
  .then(() => dispatch(push('/')))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function deleteUser(token) {
  const query = { "query":
    `mutation deleteExistingUser {
      user: deleteUser (
        token: "${token}"
      )
      {
        username
      }
    }`
  };

  return (dispatch) => fetch(`${API_URL}/data/`, {
    method: 'POST',
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: DELETE_USER,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function loginUser(user) {
  const query = { "query":
    `mutation loginUser {
      user: loginUser (
        username: "${user.username}",
        password: "${user.password}"
      )
      {
        id
        username
        name
        email
        token
      }
    }`
  };

  return (dispatch) => {
    dispatch(resetError());

    return fetch(`${API_URL}/data/`, {
      method: 'POST',
      body: JSON.stringify(query)
    })
    .then(response => response.json())
    .then(json => _.isEmpty(json.errors) ? json : Promise.reject(json.errors[0]))
    .then(payload => {
      dispatch({payload, type: LOGIN_USER})
    })
    .catch(exception => dispatch({
      type: ERROR,
      payload: exception.message
    }));

  }
}

export function logoutUser() {
  return dispatch => {
    dispatch({type: LOGOUT_USER});
    dispatch(push('/'));
  }
}
