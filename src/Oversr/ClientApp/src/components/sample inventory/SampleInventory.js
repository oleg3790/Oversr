import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlusSquare, faEdit } from '@fortawesome/free-solid-svg-icons';
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

    getTableRow(item) {
        return (
            <tr key={item.id}>
                <td>
                    <div>                                         
                        {item.style.designer.deleted 
                        ? <span className="text-danger">{item.style.designer.name} (Inactive)</span>
                        : item.style.designer.name}                                      
                    </div>                                    
                </td>
                <td>
                    <div>
                        Number: {item.style.number}
                    </div> 
                    <div>
                        Name: {item.style.name}
                    </div>   
                    {item.style.discontinued && <div className="text-warning-1">This style has been discontinued</div>}
                    {item.style.deleted && <div className="text-danger">Inactive style</div>}
                </td>
                <td>{item.size}</td>
                <td>{item.color}</td>
                <td className={item.inventoryStatus.name === "Sold" && "text-danger"}>{item.inventoryStatus.name}</td>
                <td>
                    <FontAwesomeIcon icon={faEdit} className="icon-btn text-info"/>
                </td>
            </tr>
        );
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
                <table className="table table-sm" style={{ fontSize: '14px' }}>
                    <thead className="bg-light-1">
                        <tr>
                            <th scope="col" width="250">Designer</th>
                            <th scope="col" width="300">Style</th>
                            <th scope="col">Size</th>
                            <th scope="col">Color</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
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
                        {this.state.sampleInventoryItems.length !== 0 && this.state.sampleInventoryItems.map(x => this.getTableRow(x))} 
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
