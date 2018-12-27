import React from 'react';

export default function TextInput(props) {
    return (
        <div className="input-group">
            <div className="input-group-prepend">
                <label className="input-group-text" 
                    style={{ display: 'block', textAlign: 'right', width: props.labelWidth ? props.labelWidth : '100px' }}>{props.label}</label>
            </div>
            <input className="form-control" type="text" onChange={props.onChange} 
                value={props.value ? props.value : undefined} readOnly={props.readOnly}/>
        </div>
    );
}