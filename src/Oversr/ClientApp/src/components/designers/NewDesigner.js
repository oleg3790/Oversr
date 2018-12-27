import React, { Component } from 'react';
import { InventoryService } from '../../services/InventoryService';
import ModalContainer from '../../commons/ModalContainer';
import TextInput from '../../commons/input/TextInput';

export default class NewDesigner extends Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSave = this.handleSave.bind(this);  
        this.setNotification = this.setNotification.bind(this);   
        this.getModalFooter = this.getModalFooter.bind(this);   
        this.state = {
            notification: {
                isSuccess: false,
                text: null
            },
            name: ''
        };
    }

    handleNameChange(e) {
        this.clearNotification();
        this.setState({ name: e.target.value });
    }

    async handleSave() {
        this.clearNotification();
        try {
            if (this.state.name) {
                const result = await InventoryService.SaveNewDesigner(this.state.name);
                
                if (!result) {
                    this.props.toggleVisibility(true);
                }
                else {
                    this.setNotification(false, result);
                }
            }
            else {
                this.setNotification(false, "A name is required before saving");
            }            
        }
        catch (err) {
            this.setNotification(false, err.message);
        }
    }

    clearNotification() {
        this.setNotification(false, null);
    }

    setNotification(isSuccess, text) {
        this.setState({ notification: { isSuccess: isSuccess, text: text }});
    }

    getModalFooter() {
        return (
            <div className="modal-footer row no-gutters">
                <div className="col-2">
                    <button className="btn btn-block btn-outline-primary" onClick={this.props.toggleVisibility}>Cancel</button>                                    
                </div>
                <div className="col-3">
                    <button className="btn btn-block btn-primary" onClick={this.handleSave}>Save</button>
                </div>
            </div>
        );
    }

    render() {
        return (
            <ModalContainer title="Add Designer" toggleVisibility={this.props.toggleVisibility}
                notification={this.state.notification} footer={this.getModalFooter()}>
                <div className="row">
                    <div className="col-12">
                        <TextInput label="Name" onChange={this.handleNameChange}/>
                    </div>
                </div>
            </ModalContainer>
        );
    }
}