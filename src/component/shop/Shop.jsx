import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { useLoaderData, useNavigate } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const { totalProducts } = useLoaderData();
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemPerPage] = useState(10);
 
    const options = [5, 10, 20]
    const totalPages = Math.ceil(totalProducts/ itemsPerPage);
    // module 72-4
    const pageNumbers = [...Array(totalPages).keys()];

        const  handleSelectChange = event => {
            setItemPerPage(parseInt(event.target.value));
            setCurrentPage(0);
        }


        // load data based on currentpage and itemperpage
        useEffect(()=>{
            async function fetchData(){
                const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`);
                const data = await response.json();
                setProducts(data);
               
            }
            fetchData();
        },[currentPage, itemsPerPage])



    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, [])



    const [cart, setCart] = useState([]);
    console.log(cart);
    const handleAddToCart = (products) => {
        //    const newCart = [...cart, products];
        let newCart = [];
        const exists = cart.find(pd => pd._id === products._id);
        if (!exists) {
            products.quantity = 1;
            newCart = [...cart, products];
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== products._id);
            newCart = [...remaining, exists];
        }
        setCart(newCart);
        addToDb(products._id);
    }


    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1 get id
        for (const id in storedCart) {
            // get the product using by id
            const addedProduct = products.find(product => product._id === id)

            // get the quantity of the product
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // add the added product to the savedcart
                savedCart.push(addedProduct);
            }
        }
        // set the cart
        setCart(savedCart);
    }, [products])

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    const navigate = useNavigate();
    const handle = () => {
        navigate('/orders');
    }


    return (
        <>
            <div className='shop-container'>

                <div className="products-container">
                    {
                        products.map(product => <Product handleAddToCart={handleAddToCart} product={product} key={product._id}></Product>)
                    }

                </div>

                <div className="cart-container">
                    <Cart handle={handle} handleClearCart={handleClearCart} cart={cart}>
                        <div>Review Orders</div>
                    </Cart>
                </div>

            </div>


            {/* pagination */}
                    <div className="pagination">
                        <p>Current Page: {currentPage}</p>
                        {
                            pageNumbers.map(number => <button key={number} className={currentPage=== number ?'selected' : ''}  onClick={() => setCurrentPage(number)}>{number}</button>)
                        }
                        <select value={itemsPerPage} onChange={handleSelectChange}>
                        {
                            options.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))
                        }
                        </select>
                    </div>

        </>
    );
};

export default Shop;