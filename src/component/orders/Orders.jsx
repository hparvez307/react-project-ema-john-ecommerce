import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import './Order.css';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import ReviewItem from '../reviewItem/ReviewItem';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const savedCart = useLoaderData();
    const [cart, setCart] = useState(savedCart);

    const handleRemoveFromCart = (id) => {
        const remaining = cart.filter(product => product._id !== id);
        removeFromDb(id);
        setCart(remaining);

    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    const navigate = useNavigate();

    const handle = () => {
        navigate('/checkout');
    }
 
    return (
        <div className='shop-container'>
            <div className="review-container">
         {
            cart.map(product => <ReviewItem
            handleRemoveFromCart={handleRemoveFromCart}
            product={product}
            key={product._id}
            ></ReviewItem>)
         }
            </div>

            <div className="cart-container">
               <Cart handle={handle}  handleClearCart={handleClearCart} cart={cart}>
                
               <div>Proceed Checkout</div>
               </Cart>
            </div>
        </div>
    );
};

export default Orders;