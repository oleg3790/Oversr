import React from 'react';
import NotificationBanner from '../commons/NotificationBanner';

export default function ModalContainer(props) {
    return (
        <div className="modal show">                
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <NotificationBanner notification={props.notification}/>
                        <div className="modal-header">                            
                            <h5 className="modal-title">{props.title}</h5>
                            <button type="button" className="close" onClick={props.toggleVisibility}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {props.children}
                        </div>
                        {props.footer}
                    </div>
                </div>
            </div>
    );
}