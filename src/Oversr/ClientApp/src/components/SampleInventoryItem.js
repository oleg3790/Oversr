import React, { Component } from 'react'

export default class SampleInventoryItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="modal">        
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add New Sample Inventory Item</h5>
                            <button type="button" className="close" onClick={this.props.onExit}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
