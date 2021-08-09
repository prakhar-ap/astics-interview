import React from 'react';
import PropTypes from 'prop-types';

function Button({
    onClick,
    children,
    disabled,
}) {
    return (
        <button
            className={'button'}
            onClick={onClick}
            disabled={disabled}>
            {children}
        </button>
    )
}


Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.oneOf(['string', 'object']).isRequired,
    disabled: PropTypes.bool,    
};

export default Button;