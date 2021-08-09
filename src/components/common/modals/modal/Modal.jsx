import React from 'react';

function Modal({isOpen, children}) {
    return (
        <div className={'Modal'} style= {{ display: !isOpen && 'none' }}>
            <div className={'modal'}>
                {children}
            </div>
        </div>
    );
}

export default Modal;