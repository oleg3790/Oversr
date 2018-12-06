import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserService } from '../services/UserService';

export const PrivateRoute  = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        UserService.IsAuthenticated()
            ? <Component {...props} />
            : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
    )} />
)