import { inject, observer} from 'mobx-react'
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Button from '../common/wrappers/Button';
import TextField from '../common/wrappers/TextField';
import _get from 'lodash/get';
import FloatingAddButton from '../common/floating-buttons/FloatingAddButton';
import AddItemModal from '../common/modals/add-item/AddItemModal';
import Item from '../item/Item';
import FloatingLeftButton from '../common/floating-buttons/FloatingLeftButton';
import FloatingRightButton from '../common/floating-buttons/FloatingRightButton';
import Select from '../common/wrappers/Select';

function Dashboard({ store }){
    const [, setCookies] = useCookies();
    const _logout = () => {
        setCookies('token', '');
    }
    const [state, setState] = useState(0);

    useEffect(() => {
        store.handleFetch();
    }, [state]);

    const labels = {
        type: 'Type',
        title: 'Title',
        price: 'Price',
        rating: 'Rating',
        sort: 'Sort by'
    };

    const _handleSave = async (form) => {
        await store.handleSave(form);
        setState(Math.random());
    }

    const _deleteItem = async (id) => {
        await store.deleteItem(id);
        setState(Math.random());
    }

    return (
        <>
            <div className={'Dashboard'} style={ store.AddItemModalStore.isOpen ? {
                pointerEvents: 'none',
                opacity: '0.4',
            } : {}}>
                <div className={'logout'}>
                    <Button onClick={() => _logout()}>Logout</Button>
                </div>
                <div className={'search'}>
                    <div className={'fields'}>
                        <Select
                            name={"type"}
                            label={_get(labels, "type")}
                            options={["All", "Grocery", "Book"]}
                            onChange={store.handleChange}
                        />
                        <TextField
                            name={"title"}
                            label={_get(labels, "title")}
                            type="text"
                            value={store.form.title}
                            onChange={store.handleChange}
                            placeholder={"Select Title"}
                        />
                        <TextField
                            name={"price"}
                            label={_get(labels, "price")}
                            type="number"
                            value={store.form.price}
                            onChange={store.handleChange}
                            placeholder={"Select Price"}
                        />
                        <Select
                            name={"rating"}
                            label={_get(labels, "rating")}
                            options={["All", 1, 2, 3, 4, 5]}
                            onChange={store.handleChange}
                        />
                        <Select
                            name={"sort"}
                            label={_get(labels, "sort")}
                            options={['Title', 'Price']}
                            onChange={store.handleSort}
                        />
                    </div>
                    <div className={'buttonContainer'}>
                        <Button onClick={store.handleFilter}>Filter</Button>
                        <Button onClick={store.handleClear}>Clear</Button>
                        <Button onClick={store.exportToCsv}>Export To CSV</Button>
                    </div>
                </div>
                <div className={'add-button'} onClick={() => store.openAddItemsModal()}>
                    <FloatingAddButton />
                </div>
                {
                    store.displayItems.map((item) => (
                        <React.Fragment key={Math.random()}>
                            <Item data={item} onDelete={_deleteItem}/>
                        </React.Fragment>
                    ))
                }
                <div className={'pagination'}>
                    { store.maxPages > 1 && (
                        <>
                            { store.currentPage > 1 && <div className={'pb pb-left'} onClick={() => store.handlePageChange('before')}>
                                <FloatingLeftButton />
                            </div>}
                            <div className={'pages'}>{store.currentPage} / {store.maxPages}</div>
                            { store.currentPage !== store.maxPages && <div className={'pb pb-right'} onClick={() => store.handlePageChange('next')}>
                                <FloatingRightButton />
                            </div>}
                        </>
                    )}
                </div>
            </div>
            <AddItemModal store={store.AddItemModalStore} onSave={_handleSave}/>
        </>
    );
}

export default inject('store')(observer(Dashboard));