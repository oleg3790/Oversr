import React, { Component } from 'react';
import { InventoryService } from '../../services/InventoryService';
import NotificationBanner from '../../commons/NotificationBanner';
import InteractiveDataTable from '../../commons/InteractiveDataTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { ObjectAssignmentHelpers } from '../../commons/ObjectAssignmentHelpers';
import NewStyle from './NewStyle';

export default class Styles extends Component {
    constructor(props) {
        super(props);
        this.getStyles = this.getStyles.bind(this);
        this.setNotification = this.setNotification.bind(this);
        this.toggleAddStyleVisibility = this.toggleAddStyleVisibility.bind(this);
        this.state = {
            isBusy: false,
            notification: {
                isSuccess: false,
                text: null
            },
            styles: [],
            showDeletedStyles: false,
            isAddStyleVisible: false
        };
    }

    async componentDidMount() {
        this.getStyles();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.designers !== this.props.designers ||
            prevProps.designer !== this.props.designer) {
            this.getStyles();
        }        
    }

    async getStyles() {
        this.toggleIsBusy();
        try {
            let result;

            if (this.props.designer) {
                result = await InventoryService.GetAllStylesByDesigner(this.props.designer.id);
            }
            else {
                result = await InventoryService.GetAllStyles();
            }
    
            if (Array.isArray(result)) {
                this.setState({ styles: result });
            }
            else {
                this.setNotification(false, result);
            }
        }
        catch (err) {
            this.setNotification(false, err.message);
        }
        this.toggleIsBusy();
    }

    setNotification(isSuccess, text) {
        this.setState({ notification: { isSuccess: isSuccess, text: text }});
    }

    toggleIsBusy() {
        this.setState({ isBusy: !this.state.isBusy });
    }

    toggleAddStyleVisibility(isSaveSuccessful) {
        this.setState({ isAddStyleVisible: !this.state.isAddStyleVisible });

        if (isSaveSuccessful) {
            this.getStyles();
        }
    }

    getStylesTh() {
        return (
            <tr>
                <th scope="col" width="200">Designer</th>  
                <th scope="col" width="200">Number</th>
                <th scope="col" width="200">Name</th>
                <th scope="col" width="300">Created</th>                                              
                <th scope="col" width="100"></th>
                <th scope="col" width="170"></th> 
            </tr>
        );
    }

    getStylesTBody(styles, showDeletedStyles) {
        return (
            <tbody>
                {styles.map(x => (
                    <tr key={x.id} className={x.discontinued ? "text-warning-1 font-weight-bold" : undefined}>
                        <td>{x.designer.name}</td>
                        <td>{x.number}</td>
                        <td>{x.name}</td>
                        <td>{ObjectAssignmentHelpers.ToLongDate(x.created)}</td>                                                
                        <td>
                            <FontAwesomeIcon icon={faEdit} className="icon-btn text-info"/>
                        </td>
                        <td>{x.discontinued && "Discontinued"}</td>
                    </tr>
                ))}
            </tbody>
        );
    }

    render() {
        const {styles, showDeletedStyles, isAddStyleVisible, notification, isBusy} = this.state

        return (
            <div className={this.props.className + " card"}>
                <h5 className="card-header bg-light-2 text-dark p-2 pl-3">Styles</h5>
                <div className="card-body">
                    {isAddStyleVisible && <NewStyle toggleVisibility={this.toggleAddStyleVisibility}/>}
                    <NotificationBanner notification={notification}/>
                    <div className="d-inline"> 
                        <FontAwesomeIcon icon={faPlusSquare} className="icon-btn" 
                            size="2x" title="Add new style" onClick={this.toggleAddStyleVisibility}/>   
                        <div className="float-right d-inline mt-2">
                            <input type="checkbox" className="ml-2"/>
                            <span className="ml-1">Include deleted styles</span>
                        </div>                                                        
                    </div>
                    <InteractiveDataTable className="mt-2" isBusy={isBusy} 
                            items={styles} th={this.getStylesTh()} body={this.getStylesTBody(styles, showDeletedStyles)}/>
                </div>
            </div>
        );
    }
}