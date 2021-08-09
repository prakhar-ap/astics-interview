import React from 'react';

function Image( { src, width, height } ) {
    return (
        <div
            style={ {
                width,
            } }
            className="responsive-image">
            <div style={ {
                paddingBottom: ( height / width * 100 ) + '%'
            } } />
            <img
                src={ src }
                className="responsive-image__image" alt="" />
        </div>
    );
}

export default Image;