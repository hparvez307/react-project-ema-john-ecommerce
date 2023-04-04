import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import {addToDb, getShoppingCart} from '../../utilities/fakedb';

const Shop = () => {
    const [products,setProducts] = useState([]);
    useEffect(()=>{
        fetch('products.json')
        .then(res => res.json())
        .then (data => setProducts(data))
    },[])



    const [cart, setCart]= useState([]);
    console.log(cart);
    const handleAddToCart = (products) => {
    //    const newCart = [...cart, products];
    let newCart = [];
    const exists = cart.find(pd => pd.id === products.id);
    if(!exists){
        products.quantity = 1;
        newCart= [...cart,products];
    }
    else{
        exists.quantity = exists.quantity +1;
        const remaining = cart.filter(pd => pd.id !== products.id);
        newCart = [...remaining, exists];
    }
       setCart(newCart);
       addToDb(products.id);
    }


    useEffect(()=>{
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1 get id
        for(const id in storedCart){
            // get the product using by id
            const addedProduct = products.find(product => product.id === id)

            // get the quantity of the product
           if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            // add the added product to the savedcart
            savedCart.push(addedProduct);
           }
        }
        // set the cart
        setCart(savedCart);
    },[products])


    


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