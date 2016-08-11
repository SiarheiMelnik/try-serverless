import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App.react';
import UsersIndex from './components/users/Index.react';
import UsersShow from './components/users/Show.react';
import UsersEdit from './components/users/Edit.react';
import UsersNew from './components/users/New.react';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={UsersIndex} />
    <Route path="users/:username/show" component={UsersShow} />
    <Route path="profile" component={UsersEdit} />
    <Route path="users/new" component={UsersNew} />
  </Route>
);
