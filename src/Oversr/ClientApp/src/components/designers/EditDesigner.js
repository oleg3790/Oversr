import React, { Component } from 'react'
import ModalContainer from '../../commons/ModalContainer';
import { InventoryService } from '../../services/InventoryService';
import { ObjectAssignmentHelpers } from '../../commons/ObjectAssignmentHelpers';
import TextInput from '../../commons/input/TextInput';

export default class EditDesigner extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDeleteRestore = this.handleDeleteRestore.bind(this);
        this.setNotification = this.setNotification.bind(this);
        this.getModalFooter = this.getModalFooter.bind(this);
        this.state = {
            notification: {
                isSuccess: false,
                text: null
            },
            designer: null
        }
    }

    componentWillMount() {
        this.setState({ designer: this.props.designer });
    }

    handleInputChange(e) {
        const tmp = { ...this.state.designer, name: e.target.value };
        this.setState({ designer: tmp });
    }

    async handleDeleteRestore() {
        const tmp = { ...this.state.designer, deleted: !this.state.designer.deleted }
        await this.setState({ designer: tmp });
        this.handleSave();
    }

    async handleSave() {
        try {
            const result = await InventoryService.EditDesigner(this.state.designer);

            if (!result) {                
                this.props.toggleVisibility(true);
            }
            else {
                this.setNotification(false, result);
            }
        }
        catch (err) {
            this.setNotification(false, err.message);
        }
    }

    setNotification(isSuccess, text) {
        this.setState({ notification: { isSuccess: isSuccess, text: text }});
    }

    getModalFooter() {
        return (
            <div className="modal-footer justify-content-start row no-gutters">
                <div className="col-3">
                    <button className="btn btn-block btn-primary" onClick={this.handleSave}>Save</button>
                </div>
                <div className="col-2">
                    <button className="btn btn-block btn-outline-primary" onClick={this.props.toggleVisibility}>Cancel</button>                                    
                </div>
                <div className="col-2 align-self-end">
                    {this.state.designer.deleted 
                    ? <button className="btn btn-block btn-success" onClick={this.handleDeleteRestore}>Restore</button>
                    : <button className="btn btn-block btn-danger" onClick={this.handleDeleteRestore}>Delete</button>}
                </div> 
                <small className="col-12 text-danger mt-2">* Deleting a designer will deactive all styles and inventory associated with it</small>                               
            </div>
        );
    }

    render() {
        return (
            <ModalContainer title="Edit Designer" toggleVisibility={this.props.toggleVisibility} 
                notification={this.state.notification} footer={this.getModalFooter()}>
                <div className="row">
                    <div className="col-12">
                        <TextInput label="Name" onChange={this.handleInputChange} value={this.state.designer.name}/>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-12">
                        <TextInput label="Created" value={ObjectAssignmentHelpers.ToLongDate(this.state.designer.created)} readOnly/>
                    </div>
                </div>
                {this.state.designer.deleted && <small className="mt-2 text-danger">This designer is currently in a deleted state</small>}
            </ModalContainer>
        );
    }
}