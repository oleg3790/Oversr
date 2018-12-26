import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchBox(props) {
    return (
        <div id={props.id} className={props.className + " form-control d-inline pt-1"}>
            <input className="search-input" style={{ width: props.width }}></input>
            <FontAwesomeIcon icon={faSearch} className="ml-2"/>
        </div>
    );
}