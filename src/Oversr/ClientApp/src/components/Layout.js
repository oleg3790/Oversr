import React, { Component } from 'react';

export class Layout extends Component {
  render() {
    return (
        <div>    
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <span className="navbar-brand">Royal Bridal Oversr</span>
            </nav>       
            <div className="container">
                {this.props.children}
            </div>
        </div>
    );
  }
}
