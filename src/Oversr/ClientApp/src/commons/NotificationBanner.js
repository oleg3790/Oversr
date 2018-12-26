import React, { Component } from 'react';

export default class NotificationBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notification: {
                isSuccess: false,
                text: null
            }
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.notification !== this.props.notification) {
            this.setState({ notification: this.props.notification });
            setTimeout(() => this.setState({ notification: { isSuccess: this.props.notification.isSuccess, text: null }}), 4000);
        }
    }

    render() {
        const baseClasses = "row no-gutters text-light ";
        const bgClass = this.state.notification.isSuccess ? "bg-success" : "bg-danger";        
    
        return (
            <div id="notification-banner" className={baseClasses + bgClass} style={this.state.notification.text ? { padding: '10px' } : { padding: '0px 0px 0px 10px' }}>
                {this.state.notification.text}
            </div>
        );
    }
    
} 