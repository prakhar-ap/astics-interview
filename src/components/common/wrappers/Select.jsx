import React from 'react';
import PropTypes from 'prop-types';

function Select({
    name,
    onChange,
    disabled,
    label,
    value,
    options,
}) {

    const select = () => {
        return (
            <select
                className={'options'}
                value={value}
                name={name}
                onChange={onChange}
                disabled={disabled}
            >
                {options.map((o) => (
                    <React.Fragment key={o}>
                        <option value={o}>{o}</option>
                    </React.Fragment>
                ))}
             </select>   
        );
    }

    if (label) {
        return (
            <div className={'Select'}>
                <div className={'label'}>{label}</div>
                {select()}
            </div>
        )
    }

    return (
        <div className={'Select'}>
            {select()}
        </div>
    );
}


Select.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    tooltip: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};

export default Select;