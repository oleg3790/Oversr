import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.state = {
            username: '',
            password: '',
            redirectToReferrer: false
        }
    }

    onUsernameChange = () => {

    }

    onPasswordChange = () => {

    }

    onSubmit = () => {
        
    }

    render() {
        let { from } = this.props.location.state || { from: { pathname: "/" }};
        if (this.state.redirectToReferrer) return <Redirect to={from}/>

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
                        <input id="password" className="form-control" onChange={this.onPasswordChange}></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Log In</button>                        
                </form>              
            </div>            
        );
    }
}