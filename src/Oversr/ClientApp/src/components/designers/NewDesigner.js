import React, { Component } from 'react';
import { InventoryService } from '../../services/InventoryService';
import NotificationBanner from '../../commons/NotificationBanner';

export default class NewDesigner extends Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSave = this.handleSave.bind(this);  
        this.setNotification = this.setNotification.bind(this);      
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

    render() {
        return (
            <div className="modal show">                
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <NotificationBanner notification={this.state.notification}/>
                        <div className="modal-header">                            
                            <h5 className="modal-title">Add Designer</h5>
                            <button type="button" className="close" onClick={this.props.toggleVisibility}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text samp-inv-field-lbl">Name</label>
                                        </div>
                                        <input className="form-control" type="text" onChange={this.handleNameChange}></input>
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer row no-gutters">
                            <div className="col-2">
                                <button className="btn btn-block btn-outline-primary" onClick={this.props.toggleVisibility}>Cancel</button>                                    
                            </div>
                            <div className="col-3">
                                <button className="btn btn-block btn-primary" onClick={this.handleSave}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}