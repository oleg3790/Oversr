import React from 'react';
import BusyOverlay from './BusyOverlay';

export default function InteractiveDataTable(props) {
    return (
        <table className={"table table-sm table-hover " + props.className}>
            <thead className="bg-light-1">
                {props.th}
            </thead>            
            {props.items.length === 0 ? (
                <tbody>
                    {props.isBusy && (                            
                        <tr>
                            <td colSpan="5" className="text-center pt-4">
                                <BusyOverlay/>
                            </td>                                
                        </tr>
                    )}                
                    {props.items.length === 0 && !props.isBusy && (
                        <tr>
                            <td colSpan="5" className="text-center pt-4">
                                No items to display
                            </td>
                        </tr>
                    )}
                </tbody>)
            : props.body}
        </table>
    );     
}