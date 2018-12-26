import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faTrash, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import InteractiveDataTable from '../../commons/InteractiveDataTable';
import { InventoryService } from '../../services/InventoryService';
import { ObjectAssignmentHelpers } from '../../commons/ObjectAssignmentHelpers';
import NewDesigner from './NewDesigner';
import NotificationBanner from '../../commons/NotificationBanner';

export default class Designers extends Component {
    constructor(props) {
        super(props);
        this.getDesigners = this.getDesigners.bind(this);
        this.setNotification = this.setNotification.bind(this);
        this.setDesignerDeleteFlag = this.setDesignerDeleteFlag.bind(this);
        this.editDesigner = this.editDesigner.bind(this);
        this.toggleIsBusy = this.toggleIsBusy.bind(this);        
        this.toggleAddNewDesignerVisibility = this.toggleAddNewDesignerVisibility.bind(this);
        this.toggleShowDeletedDesigners = this.toggleShowDeletedDesigners.bind(this); 
        this.state = {
            isBusy: false,
            designers: [],
            showDeletedDesigners: false,
            notification: {
                isSuccess: false,
                text: null
            },
            isAddDesignerVisible: false
        };
    }

    async componentDidMount() {
        await this.getDesigners();
    }

    async getDesigners() {
        this.toggleIsBusy();
        try {
            var designerResult = await InventoryService.GetAllDesigners();

            if (Array.isArray(designerResult)) {
                let sorted = designerResult.sort((a, b) => { return a.name.toLowerCase() == b.name.toLowerCase() ? 0 : a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;});
                
                // add view related attributes
                sorted = sorted.map(x => ({ ...x, inEdit: false }));
                this.setState({ designers: sorted });
            }
            else {
                this.setNotification(false, designerResult);
            }
        }
        catch (err) {
            this.setNotification(false, err.message)
        }
        this.toggleIsBusy();
    }

    toggleIsBusy() {
        this.setState({ isBusy: !this.state.isBusy });
    }

    toggleAddNewDesignerVisibility(isSaveSuccess) {
        this.setState({ isAddDesignerVisible: !this.state.isAddDesignerVisible });

        if (isSaveSuccess) {
            this.getDesigners();
        }
    }

    toggleShowDeletedDesigners() {
        this.setState({ showDeletedDesigners: !this.state.showDeletedDesigners });
    }

    clearNotification() {
        this.setNotification(false, null);
    }

    setNotification(isSuccess, text) {
        this.setState({ notification: { isSuccess: isSuccess, text: text }});
    }

    async setDesignerDeleteFlag(designer, deleted) {
        designer.deleted = deleted;
        await this.editDesigner(designer, designer.name + (deleted ? " has been deleted" : " has been restored"));
    }

    async editDesigner(designer, successNotification) {
        try {
            const result = await InventoryService.EditDesigner(designer);

            if (!result) {                
                await this.getDesigners();
                this.setNotification(true, successNotification);
            }
            else {
                this.setNotification(false, result);
            }
        }
        catch (err) {
            this.setNotification(false, err.message);
        }
    }

    render() {
        return (
            <div className="pt-4">
                <div className="card">
                    <h5 className="card-header bg-dark-1 text-light p-2 pl-3">Designers</h5>
                    <div className="card-body">
                        {this.state.isAddDesignerVisible && <NewDesigner toggleVisibility={(isSaveSuccess) => this.toggleAddNewDesignerVisibility(isSaveSuccess)}/>}
                        <NotificationBanner notification={this.state.notification}/>
                        <div className="d-inline"> 
                            <FontAwesomeIcon icon={faPlusSquare} className="icon-btn" 
                                size="2x" title="Add new designer" onClick={this.toggleAddNewDesignerVisibility}/>   
                            <div className="float-right d-inline mt-2">
                                <input type="checkbox" className="ml-2" onClick={this.toggleShowDeletedDesigners}/>
                                <span className="ml-1">Include deleted designers</span>
                            </div>                                                        
                        </div>
                        <InteractiveDataTable className="mt-2" isBusy={this.state.isBusy} 
                            items={this.state.designers} th={this.getDesignerTh()} body={this.getDesignerTBody(this.state.designers, this.state.showDeletedDesigners)}/>
                    </div>
                </div>                                
            </div>
        );
    }
    
    getDesignerTh() {
        return (
            <tr>
                <th scope="col" width="220">Name</th>
                <th scope="col" width="320">Created</th>
                <th scope="col" width="150"></th>
                <th scope="col" width="100"></th>
                <th scope="col"></th>
            </tr>
        );
    }

    getDesignerTBody(designers, showDeletedDesigners) {
        return (
            <tbody>
                {designers.map(x => {
                    if (!showDeletedDesigners && x.deleted) {
                        return null;
                    } 
                    else {
                        return (
                            <tr key={x.id} className={x.deleted ? "text-danger" : undefined}>
                                <td>{x.name}</td>
                                <td>{ObjectAssignmentHelpers.ToLongDate(x.created)}</td>
                                {x.deleted ? <td>Not active</td> : <td/>}                                
                                <td>
                                    <FontAwesomeIcon icon={faEdit} className="icon-btn text-info"/>
                                </td>
                                <td>
                                    {x.deleted 
                                        ? <FontAwesomeIcon icon={faPlus} className="icon-btn text-success" onClick={() => this.setDesignerDeleteFlag(x, false)}/> 
                                        : <FontAwesomeIcon icon={faTrash} className="icon-btn text-danger" onClick={() => this.setDesignerDeleteFlag(x, true)}/>}
                                </td>
                            </tr>
                        );
                    }                    
                })}
            </tbody>
        );
    }
}