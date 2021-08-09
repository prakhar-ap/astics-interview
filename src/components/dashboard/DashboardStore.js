import axios from 'axios';
import { makeObservable, observable, action, flow } from "mobx";

// helpers
import _get from 'lodash/get';
import TableStore from '../common/wrappers/TableStore';
import AddItemModalStore from '../common/modals/AddItemModal/AddItemModalStore';

const fC = (a, b) => a === b; // full comparision
const pC = (a, b) => a.includes(b); // partial comparision

class DashboardStore {
    defaultForm = {
        type: '',
        title: '',
        price: 0,
        rating: 0,
    }
    
    form = this.defaultForm;
    items = [];

    handleChange = (e) => {
        this.form[e.target.name] = e.target.value;
    }

    *handleFetch () {
        const res = yield axios.get('/items');
        this.items = _get(res.data, 'items', []); 
        this.TableStore.setData(this.items);
    }

    handleFilter = () => {
        let filteredItems = this.items.slice(); // to make sure it only copies the data not passes the reference.
        
        Object.keys(this.form).map((si) => {
            if (this.form[si]) {
                filteredItems = filteredItems.filter((f) =>
                si === 'title' 
                    ? pC(this.form[si], f[si])
                    : fC(this.form[si], f[si]));
            }
        });

        this.TableStore.setData(filteredItems);
    }

    handleClear = () => {
        this.form = this.defaultForm;
        this.TableStore.setData(this.items);
    }

    openAddItemsModal = () => {
        this.AddItemModalStore.openModal();
    }

    handleSave = (form) => {
        this.items.push(form);
        this.TableStore.setData(this.items);
    }

    constructor() {
        makeObservable(this, {
            form: observable,
            items: observable,
            handleChange: action,
            handleFetch: flow,
            handleFilter: action,
            handleClear: action,
            openAddItemsModal: action,
            handleSave: action,
        });
        this.TableStore = new TableStore()
        this.AddItemModalStore = new AddItemModalStore();
    }
}

export default DashboardStore;