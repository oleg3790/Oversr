import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { UserService } from '../services/UserService';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.handleLoginError = this.handleLoginError.bind(this);
        this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
        this.state = {
            username: '',
            password: '',
            loginError: '',
            redirectToHome: false
        };
    }

    onUsernameChange = (e) => {
        this.setState({ username: e.target.value, loginError: '' });
    }

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value, loginError: '' });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.state;

        if (username && password) {
            const y = UserService.Login(username, password, this.handleLoginError, this.handleLoginSuccess);
        } else {
            this.setState({ loginError: "Enter a Username and Password" });
        }
    }

    handleLoginError(message) {
        this.setState({ loginError: message });
    }

    handleLoginSuccess() {
        this.setState({ redirectToHome: true });
    }

    render() {
        if (this.state.redirectToHome) return <Redirect to="/" />;

        return (
            <div className="row mt-5">
                <form className="col-lg-5 offset-lg-4 col-md-4 offset-md-4 col-sm-6 offset-sm-3" onSubmit={this.onSubmit}>
                    <h1 id="login-head" className="mb-4 text-center">Login</h1>
                    <div className="form-group">
                        <label>Username</label>
                        <input id="username" className="form-control" onChange={this.onUsernameChange}></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input id="password" type="password" className="form-control" onChange={this.onPasswordChange}></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Log In</button>
                    <small className="row no-gutters mt-3 text-danger">{this.state.loginError}</small>
                </form>
            </div>
        );
    }
}