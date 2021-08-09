import { inject, observer} from 'mobx-react'
import React from 'react';
import { useCookies } from 'react-cookie';
import Button from '../common/wrappers/Button';
import TextField from '../common/wrappers/TextField';
import _get from 'lodash/get';
import FloatingAddButton from '../common/floating-buttons/FloatingAddButton';
import AddItemModal from '../common/modals/AddItemModal/AddItemModal';

function Dashboard({ store }){
    const [, setCookies] = useCookies();
    const _logout = () => {
        setCookies('token', '');
    }

    const labels = {
        type: 'Type',
        title: 'Title',
        price: 'Price',
        rating: 'Rating',
    };

    return (
        <>
            <header>
                <Button onClick={() => _logout()}>Logout</Button>
            </header>
            <div className={'Dashboard'} style={ store.AddItemModalStore.isOpen ? {
                pointerEvents: 'none',
                opacity: '0.4',
            } : {}}>
                <div className={'search'}>
                    <div className={'fields'}>
                        {Object.keys(store.search).map((s) => (
                            <React.Fragment key={s}>
                                <TextField
                                    name={s}
                                    label={_get(labels, s)}
                                    type="text"
                                    value={store.search[s]}
                                    onChange={store.handleSearchChange}
                                />
                            </React.Fragment>
                        ))}
                    </div>
                    <div className={'buttonContainer'}>
                        <Button onClick={store.handleFilter}>Filter</Button>
                        <Button onClick={store.handleClear}>Clear</Button>
                    </div>
                </div>
            </div>
            <div onClick={() => store.openAddItemsModal()}>
                <FloatingAddButton />
            </div>
            <AddItemModal title={'Add Item'} store={store.AddItemModalStore} onSave={store.handleSave}/>
        </>
    );
}

export default inject('store')(observer(Dashboard));