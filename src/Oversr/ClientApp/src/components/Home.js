import React, { Component } from 'react';

export class Home extends Component {
    displayName = Home.name

    render() {
        return (
            <div>
                <h1 className="mt-3">You are logged in!</h1>
            </div>
        );
    }
}
