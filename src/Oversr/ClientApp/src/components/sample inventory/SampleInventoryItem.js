import React, { Component } from 'react';
import ComboInput from '../../commons/ComboInput';
import { InventoryService } from '../../services/InventoryService';
import NotificationBanner from '../../commons/NotificationBanner';
import BusyOverlay from '../../commons/BusyOverlay';

export default class SampleInventoryItem extends Component {
    constructor(props) {        
        super(props);
        this.handleDataChange = this.handleDataChange.bind(this);
        this.handleNewDesignerSave = this.handleNewDesignerSave.bind(this);
        this.setNotification = this.setNotification.bind(this);
        this.toggleIsBusy = this.toggleIsBusy.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            isBusy: false,
            notification: { 
                isSuccess: true, 
                text: null 
            },            
            designers: null,            
            inventoryStatuses: null,
            data: {
                designer: null,
                styleNumber: null,
                styleName: null,                
                size: null,
                dateOrdered: null,
                dateRecieved: null,
                color: null,
                inventoryStatus: null,
                wholesalePrice: null,
                msrpPrice: null
            }
        }
    }

    async componentDidMount() {  
        this.toggleIsBusy();

        // Only load when this is a new item
        if (this.props.isNewItem) {
            this.setState({ 
                designers: await InventoryService.GetAllDesigners(),
                inventoryStatuses: await InventoryService.GetAllInventoryStatuses()
            });
        }
        
        this.toggleIsBusy();
    }

    handleDataChange(e) {        
        const fieldId = e.target.id;
        const value = e.target.value;

        let data = {...this.state.data};

        if (fieldId === 'designer' && value) {
            data[fieldId] = this.state.designers.find(x => x.name === value);
        } 
        else {
            data[fieldId] = value;
        }        

        this.setState({ data: data });
    }

    async handleNewDesignerSave(designer) {
        this.toggleIsBusy();

        try {
            await InventoryService.SaveNewDesigner(designer.trim());  
            this.setState({ designers: await InventoryService.GetAllDesigners() });     
            this.setNotification(true, 'Successfully saved new designer');
        }
        catch(err) {
            this.setNotification(false, err.response.data);
        } 
        
        this.toggleIsBusy();
    }

    setNotification(isSuccess, text) {
        this.setState({ notification: { isSuccess: isSuccess, text: text } });
    }

    toggleIsBusy() {
        this.setState({ isBusy: !this.state.isBusy });
    }

    async handleSave(e) {
        e.preventDefault();              
        const data = this.state.data;

        for(let key in data) {
            if (!data[key] && key !== 'dateRecieved') {
                this.setNotification(false, 'Cannot save when values are empty');
                return;
            }
        }

        this.toggleIsBusy();

        try {
            await InventoryService.SaveNewSampleInventoryItem(data);
            this.props.onSuccessfulSave();
        }
        catch (err) {
            this.setNotification(false, err.response.data);
        }   
        this.toggleIsBusy();     
    }

    render() {
        return (
            <div className="modal show">        
                <div id="samp-inv-item" className="modal-dialog modal-dialog-centered">
                    <form className="modal-content">
                        {this.state.isBusy && <BusyOverlay isAbsolute={true}/>}
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
                                    <ComboInput 
                                        labelClass="input-lbl" 
                                        labelText="Designer" 
                                        fieldId="designer"
                                        selectionItems={this.state.designers} 
                                        onSelectionChange={this.handleDataChange}
                                        onNewValueSave={this.handleNewDesignerSave}
                                    />                                                                                
                                </div>                                                                   
                            </div>                                                  
                            <div className="row mt-3">
                                <div className="col-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text input-lbl">Style #</label>
                                        </div>
                                        <input className="form-control" id="styleNumber" onChange={this.handleDataChange}></input>
                                    </div> 
                                </div>
                                <div className="col-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text input-lbl">Style Name</label>
                                        </div>
                                        <input className="form-control" id="styleName" onChange={this.handleDataChange}></input>
                                    </div> 
                                </div>
                            </div>                                  
                            <div className="row mt-2">
                                <div className="col-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text input-lbl">Size</label>
                                        </div>
                                        <input className="form-control" id="size" onChange={this.handleDataChange}></input>
                                    </div> 
                                </div>
                                <div className="col-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text input-lbl">Color</label>
                                        </div>
                                        <input className="form-control" id="color" onChange={this.handleDataChange}></input>
                                    </div> 
                                </div> 
                            </div>                               
                            <div className="row mt-2">
                                <div className="col-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text input-lbl">Wholesale Price</label>
                                        </div>
                                        <input className="form-control" id="wholesalePrice" onChange={this.handleDataChange}></input>
                                    </div> 
                                </div>
                                <div className="col-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text input-lbl">MSRP</label>
                                        </div>
                                        <input className="form-control" id="msrpPrice" onChange={this.handleDataChange}></input>
                                    </div> 
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text input-lbl">Date Ordered</label>
                                        </div>
                                        <input className="form-control" type="date" id="dateOrdered" onChange={this.handleDataChange}></input>
                                    </div> 
                                </div>
                                <div className="col-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text input-lbl">Date Recieved</label>
                                        </div>
                                        <input className="form-control" type="date" id="dateRecieved" onChange={this.handleDataChange}></input>
                                    </div> 
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text input-lbl">Inventory Status</label>
                                        </div>
                                        <select className="form-control" id="inventoryStatus" onChange={this.handleDataChange}>
                                            <option></option>
                                            {this.state.inventoryStatuses && this.state.inventoryStatuses.map(x => <option key={x.id}>{x.name}</option>)}
                                        </select>
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
                    </form>
                </div>
            </div>
        )
    }
}
