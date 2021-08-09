import React from 'react';
import PropTypes from 'prop-types';

function TextField({
    name,
    type,
    value,
    onChange,
    placeholder,
    tooltip,
    disabled,
    label,
}) {

    const textfield = () => {
        return (
            <input
                className={'field'}
                label={label}
                value={value}
                name={name}
                type={type}
                onChange={onChange}
                tooltip={tooltip}
                placeholder={placeholder}
                disabled={disabled}
            />
        );
    }

    if (label) {
        return (
            <div className={'TextField'}>
                <div className={'label'}>{label}</div>
                {textfield()}
            </div>
        )
    }

    return (
        <div className={'TextField'}>
            {textfield()}
        </div>
    );
}


TextField.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    tooltip: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};

TextField.defaultProps = {
    type: 'text',
};

export default TextField;