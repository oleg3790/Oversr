import React, { Component } from 'react';
import ComboInput from '../commons/ComboInput';
import { DesignerService } from '../services/DesignerService';
import NotificationBanner from '../commons/NotificationBanner';

export default class SampleInventoryItem extends Component {
    constructor(props) {        
        super(props);
        this.handleDesignerSelectionChange = this.handleDesignerSelectionChange.bind(this);
        this.handleNewDesignerSave = this.handleNewDesignerSave.bind(this);
        this.setNotification = this.setNotification.bind(this);
        this.state = {
            designers: null,
            selectedDesigner: null,
            notification: null
        }
    }

    async componentWillMount() {   
        if (this.props.isNewItem) {
            this.setState({ designers: await DesignerService.GetAllDesigners() });
        }      
    }

    handleDesignerSelectionChange(value) {        
        this.setState({ selectedDesigner: value });
    }

    async handleNewDesignerSave(designer) {
        try {
            await DesignerService.SaveNewDesigner(designer);  
            this.setState({ designers: await DesignerService.GetAllDesigners() });     
            this.setNotification(true, 'Successfully saved new designer');
        }
        catch(error) {
            this.setNotification(false, error);
        }                    
    }

    setNotification(isSuccess, text) {
        this.setState({ statusMessage: { isSuccess: isSuccess, text: text } });
        setTimeout(() => this.setState({ notification: { isSuccess: isSuccess, text: null }}), 5000);
    }

    render() {
        return (
            <div className="modal show">        
                <div id="samp-inv-item" className="modal-dialog modal-dialog-centered">
                    <form className="modal-content p-2">
                        {this.state.statusMessage &&
                            <NotificationBanner notification={this.state.statusMessage}/>
                        }
                        <div className="modal-header">                            
                            <h5 className="modal-title">Add Sample Inventory Item</h5>
                            <button type="button" className="close" onClick={this.props.toggleVisibility}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-12">
                                    <ComboInput labelText="Designer" selectionItems={this.state.designers} onSelectionChange={this.handleDesignerSelectionChange}
                                        onNewValueSave={this.handleNewDesignerSave}
                                    />                                                                                
                                </div>                                    
                            </div>
                            <div className="row mt-3">
                                <div className="col-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text samp-inv-field-lbl">Style #</label>
                                        </div>
                                        <input className="form-control"></input>
                                    </div> 
                                </div>
                                <div className="col-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text samp-inv-field-lbl">Style Name</label>
                                        </div>
                                        <input className="form-control"></input>
                                    </div> 
                                </div>
                            </div>                                  
                            <div className="row mt-2">
                                <div className="col-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text samp-inv-field-lbl">Status</label>
                                        </div>
                                        <input className="form-control"></input>
                                    </div> 
                                </div>
                                <div className="col-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text samp-inv-field-lbl">Sizes</label>
                                        </div>
                                        <input className="form-control"></input>
                                    </div> 
                                </div>
                            </div>   
                            <div className="row mt-2">
                                <div className="col-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text samp-inv-field-lbl">Date Ordered</label>
                                        </div>
                                        <input className="form-control"></input>
                                    </div> 
                                </div>
                                <div className="col-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text samp-inv-field-lbl">Date Recieved</label>
                                        </div>
                                        <input className="form-control"></input>
                                    </div> 
                                </div>
                            </div>
                            <div className="row mt-2">                                    
                                <div className="col-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text samp-inv-field-lbl">Color</label>
                                        </div>
                                        <input className="form-control"></input>
                                    </div> 
                                </div>
                                <div className="col-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text samp-inv-field-lbl">Inventory Check Status</label>
                                        </div>
                                        <input className="form-control"></input>
                                    </div> 
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text samp-inv-field-lbl">Wholesale Price</label>
                                        </div>
                                        <input className="form-control"></input>
                                    </div> 
                                </div>
                                <div className="col-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text samp-inv-field-lbl">MSRP</label>
                                        </div>
                                        <input className="form-control"></input>
                                    </div> 
                                </div>
                            </div>                                                    
                        </div>
                        <div className="modal-footer row no-gutters">
                            <div className="col-2">
                                <button className="btn btn-block btn-outline-primary" onClick={this.props.toggleVisibility}>Cancel</button>                                    
                            </div>
                            <div className="col-3">
                                <button className="btn btn-block btn-primary">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
