import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './createStore';
import routes from './createRoutes';

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
  , document.getElementById('root')
);
