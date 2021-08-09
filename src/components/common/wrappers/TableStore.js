import { makeObservable, observable, action } from "mobx";

class TableStore {
    data = [];
    currentPage = 1;

    setData = (data) => {
        this.data = data;
    }

    handlePageClick = (e, navigation) => {
        if (navigation === 'before') {
            this.currentPage -= 1;
        } else {
            this.currentPage += 1;
        }
    }

    constructor() {
        makeObservable(this, {
            data: observable,
            currentPage: observable,
            setData: action,
            handlePageClick: action,            
        });
    }
}

export default TableStore;