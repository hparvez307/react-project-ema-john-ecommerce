import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {
  
    const {name,img,seller,price,ratings} = props.product;

   
    return (
        <div className='product'>
          <img className='product-img' src={img} alt="Product Img" />
         
          <div className='info'>
          <h4>{name}</h4>
          <h5>Price: ${price}</h5>
          
            <p>Manufacturer: {seller}</p>
            <p>Ratings: {ratings} stars</p>
          </div>
         
          <div >
            <button onClick={()=>props.handleAddToCart(props.product)} className='add-cart'>
                add to cart 
                <FontAwesomeIcon icon={faShoppingCart} />
                </button>
          </div>
        </div>
    );
};

export default Product;