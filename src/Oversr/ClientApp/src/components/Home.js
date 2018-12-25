import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Inventory from './Inventory';

export class Home extends Component {
    render() {
        return (
            <div>
                <Link to="/inventory">Inventory</Link>
                <Link to="/designers">Designers</Link>
            </div>
        );
    }
}
