import { observer } from "mobx-react";
import React from 'react';
import Modal from "../modal/Modal";
import Button from "../../wrappers/Button";
import Select from "../../wrappers/Select";
import TextField from "../../wrappers/TextField";

function AddItemModal({ store, onSave }) {
    const _onSave = (e) => {
        e.preventDefault();
        onSave(store.form);
        store.closeModal();
    }

    const renderType = (field) => {
        if (field.isHidden) {
            return <></>;
        }

        if (field.type === 'select') {
            return (
                <Select name={field.id} options={field.options} label={field.label} onChange={store.handleChange} />
            );
        }

        return (
            <TextField name={field.id} label={field.label} placeholder={field.placeholder} onChange={store.handleChange} type={field.input} />
        )
    }
    
    return (
        <Modal isOpen={store.isOpen}>
            <h1>Add Item</h1>
            <Select name={"type"} options={["Grocery", "Book"]} label={"Select Type"} onChange={store.handleChange} />
            <div>
                {store.displayFields.map((field) => (
                    <React.Fragment key={field.id}>
                        {renderType(field)}
                    </React.Fragment>
                ))}
                <TextField type="file" onChange={store.onFileChange} />
            </div>
            <Button onClick={() => store.closeModal()}>Close</Button>
            <Button disabled={!store.isFormFilled} onClick={_onSave}>Save</Button>
        </Modal>
    );
}

export default observer(AddItemModal);