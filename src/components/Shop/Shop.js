import React, { useEffect, useState } from 'react';
import fakeData from './../../fakeData/index';
import './Shop.css';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';
import { addToDb, getStoredCart } from '../../utilities/fakedb';


const Shop = () => {
    // console.log(fakeData);
    const firstTen = fakeData.slice(0,10);
    let [products, setProducts]=useState(firstTen);
    const[cart, setCart]=useState([]);
    
    useEffect(()=>{
        const savedCart = getStoredCart();
        const productKeys = Object.keys(savedCart);
        const existingCart = productKeys.map(key=>{
            const product = fakeData.find(pd=>pd.key===key);
            product.quantity = savedCart[key];
            return product;
        })
        setCart(existingCart)
    },[]);
    const handleAddProduct = (product)=>{
        const quantity =  addToDb(product.key);
        // console.log(quantity);
        const pdExists = cart.find(pd=>pd.key===product.key);
        if(pdExists){
            product.quantity = quantity;
            const restProduct = cart.filter(pd=>pd.key !== product.key);
            const newCart =[...restProduct, product];
            setCart(newCart);    
        }else{
            product.quantity = 1;
            const newCart =[...cart, product];
            setCart(newCart);
        }
        // console.log(product);
  
    }

    return (
        <div className='order-container'>
            <div className="product-container">
                {
                    products.map(pd=> <Product
                        showAddToCart={true}
                        handleAddProduct={handleAddProduct}
                        product={pd} key={pd.key}></Product> )
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='/review'>
                        <button className='main-btn'>Review order</button>
                     </Link>
                </Cart>
            </div>
        </div>
    );
};



export default Shop;