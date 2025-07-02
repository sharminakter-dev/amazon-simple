import React from 'react';

const ReviewItem = (props) => {
    const {key, name, price, quantity, img} = props.product;
    const reviewItemStyle ={
        borderBottom:'1px solid lightGrey',
        margin: '0 0 5px 200px',
        paddingBottom:'5px',
    }
    return (
        <div className='review-item' style={reviewItemStyle}>
                <h1>{name}</h1>
                <p>Quantity:{quantity}</p>
                <p><small>{price}</small></p>
                <br />
                <button className='main-btn' onClick={()=>{props.removePd(key)}}>Remove</button>

        </div>
    );
};

export default ReviewItem;