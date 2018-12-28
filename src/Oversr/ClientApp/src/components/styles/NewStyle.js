import React, { Component } from 'react';
import ModalContainer from '../../commons/ModalContainer';
import TextInput from '../../commons/input/TextInput';
import ComboInput from '../../commons/input/ComboInput';
import { InventoryService } from '../../services/InventoryService';

export default class NewStyle extends Component {
    constructor(props) {
        super(props);
        this.setNotification = this.setNotification.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getModalFooter = this.getModalFooter.bind(this);  
        this.toggleIsBusy = this.toggleIsBusy.bind(this);      
        this.state = {
            isBusy: false,
            notification: {
                isSuccess: false,
                text: null
            },
            designers: null,
            data: {
                designer: null,
                number: '',
                name: '',
                msrpPrice: '',
                wholesalePrice: ''
            }            
        }
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

    async handleSave() {
        const { data } = this.state;

        for(let key in data) {
            if (!data[key] && key !== "name") {
                this.setNotification(false, `Cannot save when fields are empty`);
                return;
            }
        }

        this.toggleIsBusy();

        try {
            const result = await InventoryService.SaveNewStyle(data);

            if (!result) {
                this.props.toggleVisibility(true);
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

    handleInputChange(e) {
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

    setNotification(isSuccess, text) {
        this.setState({ notification: { isSuccess: isSuccess, text: text }});
    }

    toggleIsBusy() {
        this.setState({ isBusy: !this.state.isBusy });
    }

    getModalFooter() {
        return (
            <div className="modal-footer row no-gutters">
                <div className="col-2">
                    <button className="btn btn-block btn-outline-primary" onClick={this.props.toggleVisibility}>Cancel</button>                                    
                </div>
                <div className="col-3">
                    <button className="btn btn-block btn-primary" onClick={this.handleSave}>Save</button>
                </div>
            </div>
        );
    }

    render() {
        return(
            <ModalContainer title="Add Style" toggleVisibility={this.props.toggleVisibility}
                notification={this.state.notification} footer={this.getModalFooter()}>
                <div className="row no-gutters">
                    <div className="col-12">
                        <ComboInput label="Designer" fieldId="designer" labelWidth="160px" selectionItems={this.state.designers} onSelectionChange={this.handleInputChange}/>
                    </div>
                </div>
                <div className="row no-gutters mt-2">
                    <div className="col-12">
                        <TextInput label="Number" fieldId="number" labelWidth="160px" onChange={this.handleInputChange}/>
                    </div>
                </div>
                <div className="row no-gutters mt-2">
                    <div className="col-12">
                        <TextInput label="Name" fieldId="name" labelWidth="160px" onChange={this.handleInputChange}/>
                    </div>
                </div>
                <div className="row no-gutters mt-2">
                    <div className="col-12">
                         <TextInput label="MSRP" fieldId="msrpPrice" labelWidth="160px" onChange={this.handleInputChange}/>
                    </div>                    
                </div>
                <div className="row no-gutters mt-2">
                    <div className="col-12">
                         <TextInput label="Wholesale Price" fieldId="wholesalePrice" labelWidth="160px" onChange={this.handleInputChange}/>
                    </div>
                </div>
            </ModalContainer>
        );
    }
}