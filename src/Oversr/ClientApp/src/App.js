import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { PrivateRoute } from './components/PrivateRoute';
import { Home } from './components/Home';
import Login from './components/Login';
import { Layout } from './components/Layout';

export default class App extends Component {
    render() {    
        return (
            <Layout>
                <Switch>
                    <PrivateRoute exact path="/" component={Home}/>
                    <Route path="/login" component={Login}/>
                </Switch>            
            </Layout>
        );
    }
}
