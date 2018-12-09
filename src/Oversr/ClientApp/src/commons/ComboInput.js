import React, { Component } from 'react';

export default class ComboInput extends Component {
    constructor(props) {
        super(props); 
        this.toggleInputSelection = this.toggleInputSelection.bind(this);
        this.state = {
            isInputActive: false
        }
    }

    toggleInputSelection() {
        this.setState({ isInputActive: !this.state.isInputActive });
    }

    render() {
        return (
            <div className="input-group">
                <div className="input-group-prepend">
                    <label className="input-group-text">{this.props.labelText}</label>
                </div>
                {this.state.isInputActive 
                    ? (<input className="form-control"></input>)
                    : (
                        <select className="form-control">
                            {this.props.children}
                            <option className="combo-input" onClick={this.toggleInputSelection}>Add new value</option>
                        </select>)}
            </div>             
        );
    }
}