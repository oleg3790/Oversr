import React from 'react'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.state = {
            username: '',
            password: ''
        }
    }

    onUsernameChange = () => {

    }

    onPasswordChange = () => {

    }

    onSubmit = () => {

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <form className="col-6 offset-3" onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label for="username"></label>
                            <input id="username" className="form-control" onChange={this.onUsernameChange}></input>
                        </div>
                        <div className="form-group">
                            <label for="password"></label>
                            <input id="password" className="form-control" onChange={this.onPasswordChange}></input>
                        </div>
                        <button type="submit" className="btn btn-primary"></button>                        
                    </form>
                </div>                
            </div>            
        );
    }
}