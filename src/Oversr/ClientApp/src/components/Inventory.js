import React, { Component } from 'react';
import NavigationTabs from '../commons/NavigationTabs';
import { ObjectAssignmentHelpers } from '../commons/ObjectAssignmentHelpers';

export default class Inventory extends Component {
    constructor(props) {
        super(props);
        this.handleTabSelectionChange = this.handleTabSelectionChange.bind(this);
        this.state = {
            types: [
                {
                    id: 0,
                    value: 'Sample Inventory',
                    selected: true
                },
                {
                    id: 1,
                    value: 'Order Inventory',
                    selected: false
                }
            ]
        }
    }

    handleTabSelectionChange(e) {
        const id = e.currentTarget.dataset.id;
        const changedObj = ObjectAssignmentHelpers.changeSelectionById(this.state.types, id);
        this.setState({ types: changedObj });
    }

    render() {
        return (
            <div className="mt-2">
                <NavigationTabs navItems={this.state.types} onSelectionChange={this.handleTabSelectionChange}/>
            </div>
        );
    }
}