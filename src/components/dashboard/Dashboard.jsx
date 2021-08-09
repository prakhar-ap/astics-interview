import { inject, observer} from 'mobx-react'
import React from 'react';
import { useCookies } from 'react-cookie';
import Button from '../common/wrappers/Button';
import TextField from '../common/wrappers/TextField';
import _get from 'lodash/get';
import FloatingAddButton from '../common/floating-buttons/FloatingAddButton';
import AddItemModal from '../common/modals/AddItemModal/AddItemModal';
import Table from '../common/wrappers/Table';
import Item from '../item/Item';

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

    console.log('Here: ', JSON.stringify(store.items));

    const headers = ["Type", "Title", "brand", "author", "publisher", "stock", "dimensions", "rating"];

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
                        {Object.keys(store.form).map((s) => (
                            <React.Fragment key={s}>
                                <TextField
                                    name={s}
                                    label={_get(labels, s)}
                                    type="text"
                                    value={store.form[s]}
                                    onChange={store.handleChange}
                                />
                            </React.Fragment>
                        ))}
                    </div>
                    <div className={'buttonContainer'}>
                        <Button onClick={store.handleFilter}>Filter</Button>
                        <Button onClick={store.handleClear}>Clear</Button>
                    </div>
                </div>
                {/* {
                    store.items.length > 0 && 
                    <Table store={store.TableStore} headers={headers}/>
                } */}
                {
                    store.items.map((item) => (
                        <React.Fragment key={Math.random()}>
                            <Item data={item} />
                        </React.Fragment>
                    ))
                    
                }
                <div onClick={() => store.openAddItemsModal()}>
                    <FloatingAddButton />
                </div>
            </div>
            <AddItemModal store={store.AddItemModalStore} onSave={store.handleSave}/>
        </>
    );
}

export default inject('store')(observer(Dashboard));