import React from 'react';
import FloatingRemoveButton from '../common/floating-buttons/FloatingRemoveButton';
import Image from '../common/images/Image';
import _get from 'lodash/get';

function Item({ data, onDelete }) {

    const additionalInfo = {
        type: data.type,
        stock: data.stock,
        brand: data.brand,
        author: data.author,
        publisher: data.publisher,
        dimensions: data.dimensions,
    }

    const labels = {
        type: 'Item Type',
        stock: 'In Stock',
        brand: 'Brand',
        author: 'Author',
        publisher: 'Publisher',
        dimensions: 'Dimensions',
    }

    return (
        <div className={'Item'}>
            <div className={'paper'}>
                <Image src={data.image} width={300} height={300} />
                <div className={'divider'}/>
                <div className={'content'}>
                    <div className={'float-del'} onClick={() => onDelete(data.id)}>
                        <FloatingRemoveButton />
                    </div>
                    <div className={'title'}>{data.title}</div>
                    <span className={'price'}> ({data.currency} {data.price})</span>
                    <span className={'subtitle'}>{data.subtitle}</span>

                    <div className={'additional'}>
                        <div className={'rest-title'}>Additional Details:</div>
                        {Object.keys(additionalInfo).map((info) => additionalInfo[info] !== '' && (
                            <div className={'rest'} key={info}>
                                <div className={'rTitle'}>{_get(labels, info)}: </div>
                                <div className={'description'}>{additionalInfo[info]}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item;