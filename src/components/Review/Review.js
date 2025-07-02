import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStoredCart, deleteFromDb, clearTheCart } from '../../utilities/fakedb';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import orderSuccess from '../../images/giphy.gif';
import { useNavigate } from "react-router";

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false)
    const navigate = useNavigate();
    
    const removePd= (key)=>{
        // console.log('remove', key);
        const newCart = cart.filter(pd=>pd.key!==key);
        setCart(newCart);
        deleteFromDb(key)
    }
    
    useEffect(() => {
        const savedCart = getStoredCart();
        const productKeys = Object.keys(savedCart);
        const existingCart = productKeys.map(key=>{
            const product = fakeData.find(product=>product.key===key);
            product.quantity = savedCart[key];//cart quantity added
            return product;
        })
        // console.log(cart)
        // console.log(productKeys)
        // console.log(cartProducts)
        setCart(existingCart)
    },[])

    const handleProceedOrder = ()=>{
        navigate('/shipment');
        // setCart([])
        // setOrderPlaced(true);
        // clearTheCart();
    };

    let thankYou;
    if(orderPlaced){
        thankYou =(<div>
            <h3 style ={{ textAlign:'center'}}>Thank You for shopping</h3>
            <img src={orderSuccess} width={'25%'} style={{display: 'block', margin: 'auto'}}></img>
            </div>
        )
    }

    return (
        
        <div className='order-container'>
           <div className="product-container">
                {
                    cart.map(pd=><ReviewItem product={pd} key={pd.key} removePd={removePd} ></ReviewItem>)
                }
                {  
                    thankYou
                }
           </div>
           <div className="cart-container">
                <Cart cart={cart}>
                    <button className='main-btn' onClick={handleProceedOrder}>Proceed Checkout</button>
                </Cart>
           </div>
        </div>
    );
};

export default Review;