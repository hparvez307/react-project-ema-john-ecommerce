import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import './Order.css';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import ReviewItem from '../reviewItem/ReviewItem';
import { removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const savedCart = useLoaderData();
    const [cart, setCart] = useState(savedCart);

    const handleRemoveFromCart = (id) => {
        const remaining = cart.filter(product => product.id !== id);
        removeFromDb(id);
        setCart(remaining);

    }

 
    return (
        <div className='shop-container'>
            <div className="review-container">
         {
            cart.map(product => <ReviewItem
            handleRemoveFromCart={handleRemoveFromCart}
            product={product}
            key={product.id}
            ></ReviewItem>)
         }
            </div>

            <div className="cart-container">
               <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Orders;