import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

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
        const val = e.target.value;

        if (val === "Add new value") {
            this.toggleInputSelection();
        } 
        else {
            this.props.onSelectionChange(val);
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
                    ? (
                        <div className="row no-gutters">
                            <input className="form-control col-9"></input>   
                            <div className="col-1">
                                <FontAwesomeIcon icon={faTimes} size="2x" className="text-danger"/>                                
                            </div>   
                            <div className="col-1">
                                <FontAwesomeIcon icon={faCheck} size="2x" className="text-success"/>
                            </div>                    
                        </div>)
                    : (
                        <select className="form-control" onChange={this.handleSelectionChange}>
                            <option></option>
                            {this.props.selectionItems.map((x,i) =>
                                <option key={i}>{x.value}</option>
                            )}
                            <option className="combo-input">Add new value</option>
                        </select>)}
            </div>             
        );
    }
}