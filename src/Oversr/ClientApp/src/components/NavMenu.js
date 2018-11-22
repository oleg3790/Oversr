import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  displayName = NavMenu.name

  render() {
    return (
      <div>
        <Link to={'/'}>Home</Link>
        <Link to={'/fetchdata'}>FetchData</Link>
      </div>
    );
  }
}
