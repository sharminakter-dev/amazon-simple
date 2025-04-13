import React, { useState } from 'react';
import fakeData from './../../fakeData/index';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';


const Shop = () => {
    // console.log(fakeData);
    const firstTen = fakeData.slice(0,10);
    let [products, setProducts]=useState(firstTen);
    const[cart, setCart]=useState([]);

    const handleAddProduct = (product)=>{
        console.log(product);
        const newCart =[...cart, product];
        setCart(newCart);    
    }

    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(pd=> <Product
                        handleAddProduct={handleAddProduct}
                        product={pd} key={pd.key}></Product> )
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};



export default Shop;