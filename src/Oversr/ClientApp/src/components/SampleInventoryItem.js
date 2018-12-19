import React, { Component } from 'react';
import ComboInput from '../commons/ComboInput';
import { SampleInventoryService } from '../services/SampleInventoryService';
import NotificationBanner from '../commons/NotificationBanner';
import BusyOverlay from '../commons/BusyOverlay';

export default class SampleInventoryItem extends Component {
    constructor(props) {        
        super(props);
        this.handleDesignerSelectionChange = this.handleDesignerSelectionChange.bind(this);
        this.handleNewDesignerSave = this.handleNewDesignerSave.bind(this);
        this.setNotification = this.setNotification.bind(this);
        this.toggleIsBusy = this.toggleIsBusy.bind(this);
        this.state = {
            isBusy: false,
            notification: { 
                isSuccess: true, 
                text: null 
            },
            designers: null,
            selectedDesigner: null,
            inventoryStatuses: null
        }
    }

    async componentWillMount() {  
        this.toggleIsBusy();

        if (this.props.isNewItem) {
            this.setState({ 
                designers: await SampleInventoryService.GetAllDesigners(),
                inventoryStatuses: await SampleInventoryService.GetAllInventoryStatuses()
            });
        }
        
        this.toggleIsBusy();
    }

    handleDesignerSelectionChange(value) {        
        this.setState({ selectedDesigner: value });
    }

    async handleNewDesignerSave(designer) {
        this.toggleIsBusy();

        try {
            await SampleInventoryService.SaveNewDesigner(designer);  
            this.setState({ designers: await SampleInventoryService.GetAllDesigners() });     
            this.setNotification(true, 'Successfully saved new designer');
        }
        catch(error) {
            this.setNotification(false, error.response.data);
        } 
        
        this.toggleIsBusy();
    }

    setNotification(isSuccess, text) {
        this.setState({ notification: { isSuccess: isSuccess, text: text } });
        setTimeout(() => this.setState({ notification: { isSuccess: isSuccess, text: null }}), 4000);
    }

    toggleIsBusy() {
        this.setState({ isBusy: !this.state.isBusy });
    }

    render() {
        return (
            <div className="modal show">        
                <div id="samp-inv-item" className="modal-dialog modal-dialog-centered">
                    <form className="modal-content">
                        {this.state.isBusy && <BusyOverlay/>}
                        <NotificationBanner notification={this.state.notification}/>
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
                                            <label className="input-group-text samp-inv-field-lbl">Inventory Status</label>
                                        </div>
                                        <select className="form-control">
                                            <option></option>
                                            {this.state.inventoryStatuses && this.state.inventoryStatuses.map(x => <option key={x.id}>{x.name}</option>)}
                                        </select>
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
