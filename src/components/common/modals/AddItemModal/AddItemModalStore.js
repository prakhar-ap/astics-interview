import { makeObservable, observable, action } from "mobx";
import ModalStore from "../modal/ModalStore";

class AddItemModalStore extends ModalStore {
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
    form = this.defaultForm;

    displayFields = [
        {
            id: 'title',
            type: 'field',
            label: 'Title',
            placeholder: 'Enter Title',
        },
        {
            id: 'brand',
            type: 'field',
            isHidden: this.form.type === 'book',
            label: 'Brand',
            placeholder: 'Enter Brand',
        },
        {
            id: 'author',
            type: 'field',
            isHidden: this.form.type !== 'book',
            label: 'Author',
            placeholder: 'Enter Author Name',
        },
        {
            id: 'publisher',
            type: 'field',
            isHidden: this.form.type !== 'book',
            label: 'Publisher',
            placeholder: 'Enter Publisher Name',
        },
        {
            id: 'stock',
            type: 'field',
            label: 'Stock',
            placeholder: 'e.g. 20',
        },
        {
            id: 'dimensions',
            type: 'field',
            label: 'Dimensions',
            placeholder: 'e.g. 12.2 cm * 14.2 cm ',
        },
        {
            id: 'rating',
            type: 'select',
            label: 'Ratings',
            options: [1, 2, 3, 4, 5]
        },
    ]
    
    handleChange = (e) => {
        this.form[e.target.name] = e.target.value;
    }
    handleClear = () => {
        this.form = this.defaultForm;
    }
    
    constructor() {
        super();
        makeObservable(this, {
            form: observable,
            displayFields: observable,
            handleChange: action,
            handleClear: action,
        });
    }
}

export default AddItemModalStore;