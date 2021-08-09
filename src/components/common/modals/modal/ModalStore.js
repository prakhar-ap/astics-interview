import { action, makeObservable, observable } from "mobx";

class ModalStore {
    isOpen = false;
    openModal = () => {
        this.isOpen = true;
    }
    closeModal = () => {
        this.isOpen = false;
    }

    constructor() {
        makeObservable(this, {
            isOpen: observable,
            openModal: action,
            closeModal: action,
        });
    }
}

export default ModalStore;