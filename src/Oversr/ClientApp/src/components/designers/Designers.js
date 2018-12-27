import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faEdit } from '@fortawesome/free-solid-svg-icons';
import InteractiveDataTable from '../../commons/InteractiveDataTable';
import { InventoryService } from '../../services/InventoryService';
import { ObjectAssignmentHelpers } from '../../commons/ObjectAssignmentHelpers';
import NewDesigner from './NewDesigner';
import EditDesigner from './EditDesigner';
import NotificationBanner from '../../commons/NotificationBanner';

export default class Designers extends Component {
    constructor(props) {
        super(props);
        this.getDesigners = this.getDesigners.bind(this);
        this.setNotification = this.setNotification.bind(this);
        this.setDesignerToEdit = this.setDesignerToEdit.bind(this);
        this.toggleIsBusy = this.toggleIsBusy.bind(this);        
        this.toggleAddNewDesignerVisibility = this.toggleAddNewDesignerVisibility.bind(this);
        this.toggleEditDesignerVisibility = this.toggleEditDesignerVisibility.bind(this);
        this.toggleShowDeletedDesigners = this.toggleShowDeletedDesigners.bind(this); 
        this.state = {
            isBusy: false,
            designers: [],
            designerToEdit: null,
            showDeletedDesigners: false,
            notification: {
                isSuccess: false,
                text: null
            },
            isAddDesignerVisible: false,
            isEditDesignerVisible: false
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
                let sorted = designerResult.sort((a, b) => { return a.name.toLowerCase() === b.name.toLowerCase() ? 0 : a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;});            
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

    toggleEditDesignerVisibility(isSaveSuccess) {
        this.setState({ isEditDesignerVisible: !this.state.isEditDesignerVisible });

        if(isSaveSuccess) {
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

    setDesignerToEdit(designer) {
        this.setState({ designerToEdit: designer, isEditDesignerVisible: !this.state.isEditDesignerVisible });
    }
    
    getDesignerTh() {
        return (
            <tr>
                <th scope="col" width="220">Name</th>
                <th scope="col" width="350">Created</th>                
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
                                <td>
                                    <FontAwesomeIcon icon={faEdit} className="icon-btn text-info" title="Edit designer" onClick={() => this.setDesignerToEdit(x)}/>
                                </td>
                                {x.deleted ? <td>Deleted</td> : <td/>} 
                            </tr>
                        );
                    }                    
                })}
            </tbody>
        );
    }

    render() {
        const {designers, showDeletedDesigners, designerToEdit, isAddDesignerVisible, isEditDesignerVisible, notification, isBusy} = this.state;

        return (
            <div className="pt-4">
                <div className="card">
                    <h5 className="card-header bg-dark-1 text-light p-2 pl-3">Designers</h5>
                    <div className="card-body">
                        {isAddDesignerVisible && <NewDesigner toggleVisibility={(isSaveSuccess) => this.toggleAddNewDesignerVisibility(isSaveSuccess)}/>}
                        {isEditDesignerVisible 
                            && <EditDesigner toggleVisibility={(isSaveSuccess) => this.toggleEditDesignerVisibility(isSaveSuccess)}
                                    designer={designerToEdit}
                            />}
                        <NotificationBanner notification={notification}/>
                        <div className="d-inline"> 
                            <FontAwesomeIcon icon={faPlusSquare} className="icon-btn" 
                                size="2x" title="Add new designer" onClick={this.toggleAddNewDesignerVisibility}/>   
                            <div className="float-right d-inline mt-2">
                                <input type="checkbox" className="ml-2" onClick={this.toggleShowDeletedDesigners}/>
                                <span className="ml-1">Include deleted designers</span>
                            </div>                                                        
                        </div>
                        <InteractiveDataTable className="mt-2" isBusy={isBusy} 
                            items={designers} th={this.getDesignerTh()} body={this.getDesignerTBody(designers, showDeletedDesigners)}/>
                        {showDeletedDesigners 
                            && <small className="text-danger">* All styles and inventory associated with deleted designers will automatically be deactivated</small>}
                        <div className="row no-gutters justify-content-end">
                            <small className="text-muted">
                                {(showDeletedDesigners ? designers.length : designers.filter(x => x.deleted === false).length) + " items"}
                            </small>
                        </div>
                    </div>
                </div>                                
            </div>
        );
    }
}