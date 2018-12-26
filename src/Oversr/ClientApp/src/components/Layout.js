import React from 'react';
import { Link } from 'react-router-dom';
import { UserService } from '../services/UserService';
import logo from '../images/logo.png';

export default function Layout(props) {
    return (
        <div>    
            <nav className="navbar fixed-top navbar-expand nav-bg">
                <span className="text-danger pr-5">
                    <img src={logo} width="150"/>
                </span>
                {UserService.IsAuthenticated() && <Link className="nav-link btn btn-dark-1 mr-3" to="/inventory">Inventory</Link>}
                {UserService.IsAuthenticated() && <Link className="nav-link btn btn-dark-1" to="/designers">Designers</Link>}                
            </nav>       
            <div id="main" className="container">
                {props.children}
            </div>
        </div>
    );
}
