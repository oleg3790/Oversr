import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { PrivateRoute } from './components/PrivateRoute';
import { Home } from './components/Home';
import Login from './components/Login';
import Layout from './components/Layout';
import Inventory from './components/Inventory';
import Designers from './components/designers/Designers';

export default class App extends Component {
    render() {    
        return (
            <Layout>
                <Switch>
                    <PrivateRoute exact path="/" component={Home} />
                    <PrivateRoute exact path="/inventory" component={Inventory} />
                    <PrivateRoute exact path="/designers" component={Designers} />
                    <Route path="/login" component={Login}/>
                </Switch>            
            </Layout>
        );
    }
}
