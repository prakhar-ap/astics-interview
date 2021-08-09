import axios from 'axios';
import { makeObservable, observable, action, flow } from "mobx";

// helpers
import _get from 'lodash/get';
import AddItemModalStore from '../common/modals/AddItemModal/AddItemModalStore';

const fC = (a, b) => a === b; // full comparision
const pC = (a, b) => a.includes(b); // partial comparision

class DashboardStore {
    defaultForm = {
        type: '',
        title: '',
        brand: '',
        author: '',
        publisher: '',
        stock: 0,
        dimensions: '',
        rating: 0,
    }
    defaultSearch = {
        type: '',
        title: '',
        price: 0,
        rating: 0,
    }
    
    form = this.defaultForm;
    search = this.defaultSearch;
    items = [];

    handleChange = (e) => {
        this.form[e.target.name] = e.target.value;
    }

    handleSearchChange = (e) => {
        this.search[e.target.name] = e.target.value;
    }

    *handleFetch () {
        const res = yield axios.get('/items');
        this.items = _get(res.data, 'items', []); 
    }

    handleFilter = () => {
        let filteredItems = this.items.slice(); // to make sure it only copies the data not passes the reference.
        
        Object.keys(this.search).map((si) => {
            if (this.search[si]) {
                filteredItems = filteredItems.filter((f) =>
                si === 'title' 
                    ? pC(this.search[si], f[si])
                    : fC(this.search[si], f[si]));
            }
        });
    }

    handleClear = () => {
        this.search = this.defaultSearch;
    }

    openAddItemsModal = () => {
        this.AddItemModalStore.openModal();
    }

    handleSave = (form) => {
        console.log('before: ', JSON.stringify(this.items));
        this.items.push(form);
        console.log('after: ', JSON.stringify(this.items));
    }

    constructor() {
        makeObservable(this, {
            form: observable,
            search: observable,
            items: observable,
            handleChange: action,
            handleSearchChange: action,
            handleFetch: flow,
            handleFilter: action,
            handleClear: action,
            openAddItemsModal: action,
            handleSave: action,
        });
        this.AddItemModalStore = new AddItemModalStore();
    }
}

export default DashboardStore;