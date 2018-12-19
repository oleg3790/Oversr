import React, { Component } from 'react';
import NavigationTabs from '../commons/NavigationTabs';
import { ObjectAssignmentHelpers } from '../commons/ObjectAssignmentHelpers';
import SampleInventory from './SampleInventory';

export default class Inventory extends Component {
    constructor(props) {
        super(props);
        this.handleTabSelectionChange = this.handleTabSelectionChange.bind(this);
        this.state = {
            types: [
                {
                    id: 0,
                    value: 'Sample Inventory', // rendered as tab title
                    selected: true,
                    renderDetails: <SampleInventory/> // rendered as tab details
                }
            ]
        }
    }

    handleTabSelectionChange(e) {
        const id = e.currentTarget.dataset.id;
        const changedObj = ObjectAssignmentHelpers.ChangeSelectionById(this.state.types, id);
        this.setState({ types: changedObj });
    }

    render() {
        return (
            <div className="mt-2 row no-gutters">
                <div className="col-12">
                    <NavigationTabs navItems={this.state.types} onSelectionChange={this.handleTabSelectionChange}/>
                </div>    
                <div id="inventory-wrapper" className="col-12">
                    {this.state.types.find(x => x.selected).renderDetails}
                </div>            
            </div>
        );
    }
}