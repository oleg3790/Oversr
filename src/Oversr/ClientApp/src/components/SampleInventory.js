import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

export default class SampleInventory extends Component {
    constructor(props) {
        super(props);        
    }

    render() {
        return (
            <div className="m-3 mt-4">
                <div className="row no-gutters">
                    <div className="row no-gutters col-11 mb-3">
                        <input className="form-control col-5"></input>                      
                        <FontAwesomeIcon icon={faSearch} className="ml-2 mt-2" size="lg"/>                    
                    </div>
                    <FontAwesomeIcon icon={faPlusSquare} className="col-1 mt-2 text-right icon-btn" size="2x" title="Add new inventory sample"/>
                </div>                                
                <table className="table table-sm">
                    <thead className="bg-dark text-light">
                        <tr>
                            <th scope="col">Designer</th>
                            <th scope="col">Style #</th>
                            <th scope="col">Style Name</th>
                            <th scope="col">Sizes</th>
                            <th scope="col">Active/Disconitued/Sold</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        )
    }
}
