import React from 'react';

function Rating({ rating }) {
    const reviewStars = () => {
        let stars = [];
        for(let i= 0; i < rating; i++) {
          stars.push(<span key={Math.random()}>☆</span>);
        }
        return (
          <div>{stars}</div>
        );
      };

    return (
        <div className={'rating'}>
            {reviewStars()}
        </div>
    );
}

export default Rating;