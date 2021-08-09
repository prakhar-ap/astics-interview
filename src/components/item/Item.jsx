import React from 'react';
import Image from '../common/images/Image';

function Item({ data }) {
    return (
        <div className={'Item'}>
            <div className={'paper'}>
                <Image src={data.image} width={300} height={300} />
                {/* <div className={'item-image'}><img src={data.image} alt="" /></div> */}
                <div className={'content'}>
                    {Object.keys(data).map((d) => d !== 'image' && (
                        <div className={'field'} key={d}>
                            <span className={'title'}>{d}: &nbsp;&nbsp;</span>
                            <span className={'child'}>{data[d]}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Item;