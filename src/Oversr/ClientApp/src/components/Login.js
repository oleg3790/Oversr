import React, { Component } from 'react';
import { UserService } from '../services/UserService';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.state = {
            username: '',
            password: '',
            loginError: '',
            isBusy: false
        };
    }

    onUsernameChange = (e) => {
        this.setState({ username: e.target.value, loginError: '' });
    }

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value, loginError: '' });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = this.state;

        if (username && password) {
            this.setState({ isBusy: !this.state.isBusy });

            try{
                await UserService.Login(username, password);
                this.setState({ isBusy: !this.state.isBusy });
                this.props.history.push('/');
            } 
            catch (err) {
                this.setState({ 
                    loginError: err.response.data.message,
                    isBusy: !this.state.isBusy
                });
            }            
        } else {
            this.setState({ loginError: "Enter a Username and Password" });
        }
    }

    render() {
        return (
            <div className="row pt-5">
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
                    <button type="submit" className="btn btn-primary" disabled={this.state.isBusy}>
                        {this.state.isBusy ? <FontAwesomeIcon icon={faSpinner} pulse={true}/> : "Log In"}
                    </button>
                    <small className="row no-gutters mt-3 text-danger">{this.state.loginError}</small>
                </form>
            </div>
        );
    }
}