import axios from 'axios';
import { makeObservable, observable, action, flow } from "mobx";

// helpers
import _get from 'lodash/get';
import AddItemModalStore from '../common/modals/add-item/AddItemModalStore';
axios.defaults.baseURL = "http://localhost:3001";

const fC = (a, b) => a === b; // full comparision
const pC = (a, b) => a.toLowerCase().includes(b.toLowerCase()); // partial comparision

class DashboardStore {
    defaultForm = {
        type: '',
        title: '',
        price: '',
        rating: '',
        sortBy: '',
    }
    
    form = this.defaultForm;
    items = [];
    displayItems = [];
    currentPage = 1;
    rowsPerPage = 10;
    csvKeys = ['type', 'title', 'subtitle', 'brand', 'author', 'publisher', 'currency', 'price', 'stock', 'dimensions', 'rating', 'image'];

    handleChange = (e) => {
        this.form[e.target.name] = e.target.value;
    }

    handleFilter = () => {
        let filteredItems = this.items.slice(); // to make sure it only copies the data not passes the reference.
        
        Object.keys(this.form).map((si) => {
            if (this.form[si]) {
                if ((si === 'type' || si === 'rating') && this.form[si] === 'All') return;
                filteredItems = filteredItems.filter((f) =>
                si === 'title'
                    ? pC(f[si], this.form[si])
                    : fC(f[si], this.form[si]));
            }
        });

        this.displayItems = this.paginateItems(filteredItems);
    }

    handleClear = () => {
        this.form = this.defaultForm;
        this.displayItems = this.paginateItems(this.items.slice());
    }

    openAddItemsModal = () => {
        this.AddItemModalStore.openModal();
    }

    get maxPages() {
        return Math.ceil(this.items.length / this.rowsPerPage);
    }

    handlePageChange = (navigation) => {
        if (navigation === 'before') {
            this.currentPage -= 1;
        } else {
            this.currentPage += 1;
        }
        this.displayItems = this.paginateItems(this.items);
    }

    handleSort = () => {
        this.displayItems = this.sortByKey(this.displayItems, this.form.sortBy);
    }

    *handleFetch () {
        const res = yield axios.get('/items');
        this.items = _get(res.data, 'items', []);
        this.displayItems = this.paginateItems(this.items.slice());
    }

    *deleteItem (id) {
        yield axios.delete(`/item/${id}`);
    }

    *handleSave (form) {
        yield axios.post('/item', {
            id: Math.ceil(Math.random()*100000000),
            ...form
        });
    }

    paginateItems = (parent) => {
        const page = (this.currentPage - 1) * this.rowsPerPage;
        let max = page + this.rowsPerPage;
        if (max > this.items.length) max = this.items.length;
        
        return this.sortByKey(parent.slice(page, max), this.form.sortBy);
    }

    sortByKey = (obj, key) => {
        return obj.sort(function (a, b) {
            return a[key] > b[key] ? 1 : -1;
        });
    }

    exportToCsv = () => {
        const blob = this.convertToCsv(this.csvKeys.map((k) => k.toUpperCase()), this.csvKeys);
        let link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", 'my_items.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    convertToCsv = (csvHeaders, dataKeys) => {
        let csvFile = csvHeaders.join(',') + '\n';
        const data = this.items;
        data.forEach((row) => {
            csvFile += this.processRow(row, dataKeys);
        });

        return new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    };

    processRow = function (row, dataKeys) {
        const finalVal = dataKeys.map((dataKey) => {
            let innerValue;

            if (row[dataKey]) {
                innerValue = row[dataKey].toString();
            } else {
                innerValue = '-';
            }

            return innerValue.replace(/"/g, '""');
        });

        return finalVal.join(',') + '\n';
    };

    constructor() {
        makeObservable(this, {
            form: observable,
            items: observable,
            displayItems: observable,
            currentPage: observable,
            handleChange: action,
            handleFilter: action,
            handleClear: action,
            openAddItemsModal: action,
            handlePageChange: action,
            handleSort: action,
            handleFetch: flow,
            deleteItem: flow,
            handleSave: flow,
        });
        this.AddItemModalStore = new AddItemModalStore();
    }
}

export default DashboardStore;