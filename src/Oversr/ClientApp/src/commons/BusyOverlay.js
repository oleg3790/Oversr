import React from 'react';
import RollingLoader from './RollingLoader';
import '../styles/BusyLoader.css';

export default function BusyOverlay(props) {
    return (
        <div className="load-overlay">
            <div className="load-position">
                <RollingLoader/>
            </div>                                
        </div>
    );
}