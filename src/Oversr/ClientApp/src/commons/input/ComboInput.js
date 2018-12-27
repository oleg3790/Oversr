import React from 'react';

export default function ComboInput(props) {
    return (
        <div className="input-group row no-gutters">
            <div className="input-group-prepend">
                <label className="input-group-text" 
                    style={{ display: 'block', textAlign: 'right', width: props.labelWidth ? props.labelWidth : '100px' }}>{props.label}</label>
            </div>
            <select className="form-control" id={props.fieldId} onChange={props.onSelectionChange}>
                <option></option>
                {props.selectionItems && props.selectionItems.map(x =>
                    <option key={x.id}>{x.name}</option>
                )}
            </select>
        </div>
    );    
}