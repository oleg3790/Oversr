import React from 'react';
import '../styles/RollingLoader.css';

export default function RollingLoader(props) {
    return (
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    );
} 