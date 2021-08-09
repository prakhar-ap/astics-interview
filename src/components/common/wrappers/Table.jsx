import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

function Table({
    store,
    headers,
}) {

    console.log('data: ', store.data);
    return (
        <div className={'Table'}>
            <table>
                <thead>
                    <tr key={'head'}>
                        {headers.map((h) => (
                            <th key={h}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {store.data.map((d) => (
                        <tr>
                            {Object.keys(d).map((cell) => (
                                <td key={cell}>{d[cell]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

Table.propTypes = {
    store: PropTypes.object.isRequired,
    headers: PropTypes.array.isRequired,
};

export default observer(Table);

