﻿import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import InteractiveDataTable from '../../commons/InteractiveDataTable';
import { InventoryService } from '../../services/InventoryService';
import { ObjectAssignmentHelpers } from '../../commons/ObjectAssignmentHelpers';
import NewDesigner from './NewDesigner';
import NotificationBanner from '../../commons/NotificationBanner';

export default class Designers extends Component {
    constructor(props) {
        super(props);
        this.getDesigners = this.getDesigners.bind(this);
        this.toggleIsBusy = this.toggleIsBusy.bind(this);
        this.setNotification = this.setNotification.bind(this);
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
                const sorted = designerResult.sort((a, b) => { return a.name.toLowerCase() == b.name.toLowerCase() ? 0 : a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;}) 
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

    render() {
        return (
            <div className="pt-4">
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
        );
    }
    
    getDesignerTh() {
        return (
            <tr>
                <th scope="col" width="220">Name</th>
                <th scope="col" width="320">Created</th>
                <th scope="col" width="150"></th>
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
                                <td></td>
                            </tr>
                        );
                    }                    
                })}
            </tbody>
        );
    }
}