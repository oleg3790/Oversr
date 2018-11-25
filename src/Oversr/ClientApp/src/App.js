import React, { Component } from 'react';
import { Route } from 'react-router';
import { PrivateRoute } from './components/PrivateRoute';
import { Home } from './components/Home';
import Login from './components/Login';
import { Layout } from './components/Layout';

export default class App extends Component {
  render() {
    
    return (
        <Layout>
            <PrivateRoute path="/" component={Home}/>
            <Route path="/login" component={Login}/>
        </Layout>
    );
  }
}
