import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

export default class ComboInput extends Component {
    constructor(props) {
        super(props);
        this.toggleInputSelection = this.toggleInputSelection.bind(this);
        this.handleNewValueTextChange = this.handleNewValueTextChange.bind(this);
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
        this.handleNewValueSave = this.handleNewValueSave.bind(this);
        this.resetError = this.resetError.bind(this);
        this.state = {
            isInputActive: false,
            newValueText: null,
            error: null
        }
    }

    handleSelectionChange(e) {
        this.resetError();
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
        this.resetError();
    }

    handleNewValueTextChange(e) {
        this.setState({ newValueText: e.target.value });
        this.resetError();
    }

    handleNewValueSave(e) {
        e.preventDefault();
        this.resetError();

        if (this.state.newValueText) {
            this.props.onNewValueSave(this.state.newValueText);
            this.setState({ isInputActive: false });
        }
        else {
            this.setState({ error: 'Value cannot be empty' });
        }
    }

    resetError() {
        this.setState({ error: null });
    }

    render() {
        return (
            <div className="input-group row no-gutters">
                <div className="input-group-prepend col-3">
                    <label className="input-group-text d-inline-block text-right w-100">{this.props.labelText}</label>
                </div>
                {this.state.isInputActive
                    ? (
                        <div className="col-9 row no-gutters">
                            <input className="form-control pl-2 col-8" placeholder="Enter a new value" onChange={this.handleNewValueTextChange}></input>
                            <button className="btn btn-success col-2 ml-3" title="Save" onClick={this.handleNewValueSave}>
                                <FontAwesomeIcon icon={faCheck} size="lg" className="text-light" />
                            </button>
                            <button className="btn btn-danger col-1 ml-2" onClick={this.toggleInputSelection} title="Cancel">
                                <FontAwesomeIcon icon={faTimes} size="lg" className="text-light" />
                            </button>
                        </div>)
                    : (
                        <select className="form-control" onChange={this.handleSelectionChange}>
                            <option></option>
                            {this.props.selectionItems && this.props.selectionItems.map(x =>
                                <option key={x.id}>{x.name}</option>
                            )}
                            <option className="combo-input">Add new value</option>
                        </select>)}
                {this.state.error && <small className="col-5 offset-3 text-danger">{this.state.error}</small>}
            </div>
        );
    }
}