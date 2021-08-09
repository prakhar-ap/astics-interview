import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

function Table({
    TableStore,
    headers,
}) {
    return (
        <div className={'Table'}>
            <table>
                <tr>
                    {headers.map((h) => (
                        <th>{h}</th>
                    ))}
                </tr>
                <tbody>
                    {TableStore.data.map((d) => (
                        <tr>
                            {Object.keys(d).map((cell) => (
                                <td>{d[cell]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

Table.propTypes = {
    TableStore: PropTypes.object.isRequired,
    headers: PropTypes.array.isRequired,
};

export default observer(Table);

