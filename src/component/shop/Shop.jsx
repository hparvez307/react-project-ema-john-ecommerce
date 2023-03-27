import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {

    const [cart, setCart]= useState([]);
    console.log(cart);
    const handleAddToCart = (products) => {
       const newCart = [...cart, products];
       setCart(newCart);
    }

    const [products,setProducts] = useState([]);
    useEffect(()=>{
        fetch('products.json')
        .then(res => res.json())
        .then (data => setProducts(data))
    },[])


    return (
        <div className='shop-container'>

            <div className="products-container">
              {
                products.map(product => <Product handleAddToCart={handleAddToCart} product={product} key={product.id}></Product>)
              }

            </div>

            <div className="cart-container">
               <Cart cart={cart}></Cart>
            </div>
            
        </div>
    );
};

export default Shop;