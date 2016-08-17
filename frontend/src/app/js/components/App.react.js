
import './App.scss';
import React from 'react';
import { Component } from 'react';

import Error from './shared/Error.react';
import Header from './shared/Header.react';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Error />
        {this.props.children}
      </div>
    );
  }
}
