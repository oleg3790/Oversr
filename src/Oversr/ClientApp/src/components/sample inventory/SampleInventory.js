import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import SampleInventoryItem from './SampleInventoryItem';
import { InventoryService } from '../../services/InventoryService';
import BusyOverlay from '../../commons/BusyOverlay';

export default class SampleInventory extends Component {
    constructor(props) {
        super(props);
        this.toggleAddNewItemModal = this.toggleAddNewItemModal.bind(this);   
        this.handleNewItemSave = this.handleNewItemSave.bind(this);
        this.toggleIsBusy = this.toggleIsBusy.bind(this);
        this.state = {
            isBusy: false,
            isAddNewVisible: false,
            sampleInventoryItems: []
        };
    }

    async componentDidMount() {
        this.toggleIsBusy();
        this.setState({ 
            sampleInventoryItems: await InventoryService.GetSampleInventoryItems('Active')
        }); 
        this.toggleIsBusy();
    }

    toggleAddNewItemModal(e) {
        e.preventDefault();
        this.setState({ isAddNewVisible: !this.state.isAddNewVisible });
    }

    async handleNewItemSave() {   
        this.toggleIsBusy();  
        this.setState({ 
            isAddNewVisible: !this.state.isAddNewVisible,
            sampleInventoryItems: await InventoryService.GetSampleInventoryItems('Active')
        }); 
        this.toggleIsBusy();    
    }

    toggleIsBusy() {
        this.setState({ isBusy: !this.state.isBusy });
    }

    render() {
        return (
            <div className="m-3 mt-4">
                {this.state.isAddNewVisible && <SampleInventoryItem toggleVisibility={this.toggleAddNewItemModal} isNewItem={true} onSuccessfulSave={this.handleNewItemSave}/>}
                <div className="row no-gutters justify-content-between">
                    <div className="row no-gutters col-11 mb-3">
                        <input className="form-control col-5"></input>                      
                        <FontAwesomeIcon icon={faSearch} className="ml-2 mt-2" size="lg"/>                    
                    </div>
                    <FontAwesomeIcon icon={faPlusSquare} className="mt-2 text-right icon-btn" 
                        size="2x" title="Add new inventory sample" onClick={this.toggleAddNewItemModal}/>
                </div>                                
                <table className="table table-sm">
                    <thead className="bg-light-1">
                        <tr>
                            <th scope="col">Designer</th>
                            <th scope="col">Style #</th>
                            <th scope="col">Style Name</th>
                            <th scope="col">Size</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.isBusy && (                            
                            <tr>
                                <td colSpan="5" className="text-center pt-4">
                                    <BusyOverlay/>
                                </td>                                
                            </tr>
                        )}
                        {this.state.sampleInventoryItems.length !== 0 
                        && this.state.sampleInventoryItems.map(x => (
                            <tr key={x.id}>
                                <td>{x.designer.name}</td>
                                <td>{x.styleNumber}</td>
                                <td>{x.styleName}</td>
                                <td>{x.size}</td>
                                <td>{x.inventoryStatus.name}</td>
                            </tr>
                        ))} 
                        {this.state.sampleInventoryItems.length === 0 && !this.state.isBusy && (
                            <tr>
                                <td colSpan="5" className="text-center pt-4">
                                    No inventory items to display
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}
