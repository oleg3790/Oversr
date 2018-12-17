import React from 'react';

export default function NotificationBanner(props) {
    const baseClasses = "row no-gutters text-light ";
    const bgClass = props.notification.isSuccess ? "bg-success" : "bg-danger";
    
    return (
        <div id="notification-banner" className={baseClasses + bgClass} style={props.notification.text ? { padding: '10px' } : { padding: '0px 0px 0px 10px' }}>
            {props.notification.text}
        </div>
    );
} 