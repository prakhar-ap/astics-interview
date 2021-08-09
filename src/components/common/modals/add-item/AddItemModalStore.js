import { makeObservable, observable, action } from "mobx";
import ModalStore from "../modal/ModalStore";

class AddItemModalStore extends ModalStore {
    defaultForm = {
        type: 'Grocery',
        title: '',
        brand: '',
        author: '',
        publisher: '',
        currency: 'INR',
        price: 0,
        stock: 0,
        dimensions: '',
        rating: 1,
        image: '',
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
            id: 'subtitle',
            type: 'field',
            label: 'Subtitle',
            placeholder: 'Enter Subtitle',
        },
        {
            id: 'dimensions',
            type: 'field',
            label: 'Dimensions',
            placeholder: 'e.g. 12.2 cm * 14.2 cm ',
        },
        {
            id: 'brand',
            type: 'field',
            isHidden: this.form.type === 'Book',
            label: 'Brand',
            placeholder: 'Enter Brand',
        },
        {
            id: 'author',
            type: 'field',
            isHidden: this.form.type !== 'Book',
            label: 'Author',
            placeholder: 'Enter Author Name',
        },
        {
            id: 'publisher',
            type: 'field',
            isHidden: this.form.type !== 'Book',
            label: 'Publisher',
            placeholder: 'Enter Publisher Name',
        },
        {
            id: 'currency',
            type: 'select',
            label: 'Curreny',
            options: ['INR', 'EUR']
        },
        {
            id: 'price',
            type: 'field',
            label: 'Price',
            input: 'number',
            placeholder: 'e.g. 50$',
        },
        {
            id: 'stock',
            type: 'field',
            label: 'Stock',
            input: 'number',
            placeholder: 'e.g. 20',
        },
        {
            id: 'rating',
            type: 'select',
            label: 'Ratings',
            options: [1, 2, 3, 4, 5]
        },
    ]
    
    handleChange = (e) => {
        const { name, value } = e.target;
        this.form[name] = value;
        if (name === 'type') {
            this.displayFields[3].isHidden = this.form.type === 'Book';
            this.displayFields[4].isHidden = this.form.type !== 'Book';
            this.displayFields[5].isHidden = this.form.type !== 'Book';
        }
    }

    handleClear = () => {
        this.form = this.defaultForm;
    }

    onFileChange = (event) => {
        this.form.image = URL.createObjectURL(event.target.files[0])      
    };

    get isFormFilled () {
        const { type, title, subtitle, brand, author, publisher, dimensions, image } = this.form;
        return !!title
            && !!subtitle
            && (type !== 'Book' ? !!brand : true)
            && (type === 'Book' ? !!author : true)
            && (type === 'Book' ? !!publisher : true)
            && !!dimensions
            && !!image;
    }
    
    constructor() {
        super();
        makeObservable(this, {
            form: observable,
            displayFields: observable,
            handleChange: action,
            handleClear: action,
            onFileChange: action,
        });
    }
}

export default AddItemModalStore;