import React, { Component } from 'react';
import { InventoryService } from '../../services/InventoryService';
import NotificationBanner from '../../commons/NotificationBanner';
import InteractiveDataTable from '../../commons/InteractiveDataTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { ObjectAssignmentHelpers } from '../../commons/ObjectAssignmentHelpers';
import NewStyle from './NewStyle';
import EditStyle from './EditStyle';

export default class Styles extends Component {
    constructor(props) {
        super(props);
        this.getStyles = this.getStyles.bind(this);
        this.setNotification = this.setNotification.bind(this);
        this.handleEditStyle = this.handleEditStyle.bind(this);
        this.toggleAddStyleVisibility = this.toggleAddStyleVisibility.bind(this);
        this.toggleEditStyleVisibility = this.toggleEditStyleVisibility.bind(this);
        this.toggleShowDeletedStyles = this.toggleShowDeletedStyles.bind(this);
        this.state = {
            isBusy: false,
            notification: {
                isSuccess: false,
                text: null
            },
            styles: [],
            styleEditRender: null,
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

    toggleEditStyleVisibility(isSaveSuccessful) {
        this.setState({ styleEditRender: null });

        if (isSaveSuccessful) {
            this.getStyles();
        }
    }

    toggleShowDeletedStyles() {
        this.setState({ showDeletedStyles: !this.state.showDeletedStyles });
    }

    handleEditStyle(editableStyle) {
        this.setState({ styleEditRender: <EditStyle style={editableStyle} toggleVisibility={this.toggleEditStyleVisibility}/> });
    }

    getStylesTh() {
        return (
            <tr>
                <th scope="col" width="160">Designer</th>  
                <th scope="col" width="140">Number</th>
                <th scope="col" width="150">Name</th>
                <th scope="col" width="100">MSRP</th>
                <th scope="col" width="180">Wholesale Price</th>
                <th scope="col" width="130">Created</th>                                              
                <th scope="col" width="50"></th>
                <th scope="col"></th> 
            </tr>
        );
    }

    getStylesTBody(styles, showDeletedStyles) {
        return (
            <tbody>
                {styles.map(x => {
                    let status;
                    let statusClass;

                    if (x.deleted && x.discontinued) {
                        status = "Deleted and Discontinued";
                        statusClass = "text-danger";
                    } 
                    else  if (x.deleted) {
                        status = "Deleted";
                        statusClass = "text-danger";
                    }
                    else if (x.discontinued) {
                        status = "Discontinued";
                        statusClass = "text-warning-1";
                    } else if (x.designer.deleted) {
                        status = "Designer Deleted";
                        statusClass = "text-danger";
                    }

                    if (!showDeletedStyles && (x.deleted || x.designer.deleted)) {
                        return null;
                    } 
                    else {
                        return (
                            <tr key={x.id} className={statusClass}>
                                <td>{x.designer.name}</td>
                                <td>{x.number}</td>
                                <td>{x.name}</td>
                                <td>{x.msrpPrice}</td>
                                <td>{x.wholesalePrice}</td>
                                <td>{ObjectAssignmentHelpers.ToLongDate(x.created)}</td>                                                
                                <td>
                                    <FontAwesomeIcon icon={faEdit} className="icon-btn text-info" onClick={() => this.handleEditStyle(x)}/>
                                </td>
                                <td>{status}</td>
                            </tr>
                        ) 
                    }                                   
                })}
            </tbody>
        );
    }

    render() {
        const {styles, showDeletedStyles, styleEditRender, isAddStyleVisible, notification, isBusy} = this.state;

        return (
            <div className={this.props.className + " card"}>
                <h5 className="card-header bg-light-2 text-dark p-2 pl-3">Styles</h5>
                <div className="card-body">
                    {isAddStyleVisible && <NewStyle toggleVisibility={this.toggleAddStyleVisibility}/>}
                    {styleEditRender}
                    <NotificationBanner notification={notification}/>
                    <div className="d-inline"> 
                        <FontAwesomeIcon icon={faPlusSquare} className="icon-btn" 
                            size="2x" title="Add new style" onClick={this.toggleAddStyleVisibility}/>   
                        <div className="float-right d-inline mt-2">
                            <input type="checkbox" className="ml-2" onClick={this.toggleShowDeletedStyles}/>
                            <span className="ml-1">Include deleted styles</span>
                        </div>                                                        
                    </div>
                    <InteractiveDataTable className="mt-2" isBusy={isBusy} 
                            items={styles} th={this.getStylesTh()} body={this.getStylesTBody(styles, showDeletedStyles)}/>
                    <div className="row no-gutters justify-content-end">
                        <small className="text-muted">
                            {(showDeletedStyles ? styles.length : styles.filter(x => x.deleted === false && x.designer.deleted == false).length) + " items"}
                        </small>
                    </div>
                    {showDeletedStyles 
                            && <small className="text-danger">* All styles and inventory associated with deleted styles will automatically be deactivated</small>}
                </div>
            </div>
        );
    }
}