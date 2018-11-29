import React from 'react';

export default function NavigationTabs(props) {
    return (
        <ul className="nav nav-tabs">
            {props.navItems.map(x =>
                    <li key={x.id} data-id={x.id} className="nav-item" onClick={props.onSelectionChange}>
                        <span className={x.selected ? "nav-link active" : "nav-link"}>{x.value}</span>
                    </li>
                )}
        </ul>
    );
}