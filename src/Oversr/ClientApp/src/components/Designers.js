import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import InteractiveDataTable from '../commons/InteractiveDataTable';
import { InventoryService } from '../services/InventoryService';
import { ObjectAssignmentHelpers } from '../commons/ObjectAssignmentHelpers';

export default class Designers extends Component {
    constructor(props) {
        super(props);
        this.toggleIsBusy = this.toggleIsBusy.bind(this);
        this.setNotification = this.setNotification.bind(this);
        this.state = {
            isBusy: false,
            designers: [],
            notification: {
                isSuccess: false,
                text: null
            }
        }
    }

    async componentDidMount() {
        this.toggleIsBusy();
        try {
            var designerResult = await InventoryService.GetAllDesigners();

            if (Array.isArray(designerResult)) {
                this.setState({ designers: await designerResult });
            }
            else {
                this.setNotification(false, "Error encountered while trying to fetch designers");
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

    clearNotification() {
        this.setNotification(false, null);
    }

    setNotification(isSuccess, text) {
        this.setState({ notification: { isSuccess: isSuccess, text: text }});
    }

    render() {
        return (
            <div className="pt-4">
                <div className="d-inline"> 
                    <FontAwesomeIcon icon={faPlusSquare} className="icon-btn" 
                        size="2x" title="Add new designer"/>   
                    <div className="float-right d-inline mt-2">
                        <input type="checkbox" className="ml-2"/>
                        <span className="ml-1">Include deleted designers</span>
                    </div>                                                        
                </div>
                <InteractiveDataTable className="mt-2" isBusy={this.state.isBusy} 
                    items={this.state.designers} th={this.getDesignerTh()} body={this.getDesignerTBody(this.state.designers)}/>
            </div>
        );
    }
    
    getDesignerTh() {
        return (
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Created</th>
            </tr>
        );
    }

    getDesignerTBody(designers) {
        return (
            <tbody>
                {designers.map(x => (
                    <tr key={x.id}>
                        <td>{x.name}</td>
                        <td>{ObjectAssignmentHelpers.ToLongDate(x.created)}</td>
                    </tr>
                ))}
            </tbody>
        );
    }
}