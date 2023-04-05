import React from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const Cart = ({cart,handleClearCart, children,handle}) => {

    
    let total = 0;
    let totalShipping = 0;
    let quantity = 0;
    for(const product of cart){
        // product.quantity = product.quantity || 1;
          total = total + product.price * product.quantity;
          totalShipping = totalShipping +product.shipping;
          quantity = quantity + product.quantity;
    }

    const tax = (total / 100) * 7;
    const grandTotal = total + totalShipping + tax;


   
    return (
        <div className='cart'>

            <h3>Order Summery</h3>
            <p>Selected Items: {quantity} </p>
            <p>Total Price: ${total}</p>
            <p>Total Shipping: ${totalShipping}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h6>Grand Total: ${grandTotal}</h6>

            <button onClick={ handleClearCart} style={{display:'flex',justifyContent: 'space-between',fontWeight: '800',margin:'0 auto',backgroundColor:'red',color:'white',width:'90%'}} >
                <span style={{}}>Clear Cart</span>
                <FontAwesomeIcon style={{}} icon={faTrash} />
                </button>

                <button onClick={handle}   style={{fontWeight: '800',backgroundColor:'yellow',color:'black',width:'90%',marginTop:'8px'}} >
          {children} 
                </button>
        </div>
    );
};

export default Cart;