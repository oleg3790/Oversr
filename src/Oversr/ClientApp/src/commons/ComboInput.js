import React, { Component } from 'react';

export default class ComboInput extends Component {
    constructor(props) {
        super(props); 
        this.toggleInputSelection = this.toggleInputSelection.bind(this);
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
        this.state = {
            isInputActive: false
        }
    }

    handleSelectionChange(e) {
        const id = e.target.dataset.id;

        if (id === -1) {
            this.toggleInputSelection();
        } 
        else {

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
                        <select className="form-control" onChange={this.handleSelectionChange}>
                            {this.props.selectionItems.map((x,i) =>
                                <option key={i} data-id={i}>{x.value}</option>
                            )}
                            <option data-id={-1} className="combo-input" onChange={this.toggleInputSelection}>Add new value</option>
                        </select>)}
            </div>             
        );
    }
}