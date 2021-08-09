import React from 'react';

function Modal({isOpen, children}) {
    return (
        <div className={'Modal'} style= {{ display: !isOpen && 'none' }}>
            {children}
        </div>
    );
}

export default Modal;