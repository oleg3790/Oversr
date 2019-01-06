import React, { Component } from 'react';
import ModalContainer from '../../commons/ModalContainer';
import TextInput from '../../commons/input/TextInput';
import ComboInput from '../../commons/input/ComboInput';
import { InventoryService } from '../../services/InventoryService';

export default class EditStyle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBusy: false,
            notification: {
                isSuccess: false,
                text: null
            },
            designers: null,
            style: null          
        };
    }

    componentWillMount() {
        this.setState({ style: this.props.style });
    }

    async componentDidMount() {
        this.toggleIsBusy();
        try {
            let result = await InventoryService.GetAllDesigners(true);            
            if (Array.isArray(result)) {
                result.sort((a, b) => { return a.name.toLowerCase() === b.name.toLowerCase() ? 0 : a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;});
                this.setState({ designers: result });
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

    getModalFooter() {
        return (
            <div className="modal-footer justify-content-start row no-gutters">
                <div className="col-3">
                    <button className="btn btn-block btn-primary" onClick={this.handleSave}>Save</button>
                </div>
                <div className="col-2">
                    <button className="btn btn-block btn-outline-primary" onClick={this.props.toggleVisibility}>Cancel</button>                                    
                </div>
                <div className="col-2 align-self-end">
                    {this.state.style.deleted 
                    ? <button className="btn btn-block btn-success" onClick={this.handleDeleteRestore}>Restore</button>
                    : <button className="btn btn-block btn-danger" onClick={this.handleDeleteRestore}>Delete</button>}
                </div> 
                <small className="col-12 text-danger mt-2">* Deleting a style will deactivate all inventory associated with it</small>                               
            </div>
        );
    }

    render() {
        const { style } = this.state;

        return (
            <ModalContainer title="Edit Style" toggleVisibility={this.props.toggleVisibility}
                notification={this.state.notification} footer={this.getModalFooter()}>
                <div className="row no-gutters">
                    <div className="col-12">
                        <ComboInput label="Designer" fieldId="designer" labelWidth="160px" selectionItems={this.state.designers} onSelectionChange={this.handleInputChange}/>
                    </div>
                </div>
                <div className="row no-gutters mt-2">
                    <div className="col-12">
                        <TextInput label="Number" fieldId="number" labelWidth="160px" onChange={this.handleInputChange} value={style.number}/>
                    </div>
                </div>
                <div className="row no-gutters mt-2">
                    <div className="col-12">
                        <TextInput label="Name" fieldId="name" labelWidth="160px" onChange={this.handleInputChange} value={style.name}/>
                    </div>
                </div>
                <div className="row no-gutters mt-2">
                    <div className="col-12">
                         <TextInput label="MSRP" fieldId="msrpPrice" labelWidth="160px" onChange={this.handleInputChange} value={style.msrpPrice}/>
                    </div>                    
                </div>
                <div className="row no-gutters mt-2">
                    <div className="col-12">
                         <TextInput label="Wholesale Price" fieldId="wholesalePrice" labelWidth="160px" onChange={this.handleInputChange} value={style.wholesalePrice}/>
                    </div>
                </div>
            </ModalContainer>
        );
    }
}