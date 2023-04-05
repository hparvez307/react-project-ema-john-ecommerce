import { getShoppingCart } from "../utilities/fakedb";

const  cartProductsLoader = async () => {

        const loadedProducts = await fetch('products.json');
        const products = await loadedProducts.json();
        // if data is in database then you have to use async await to get data from database
        // now data is in local storage so we dont need to use async await. we just need to get data from local storage


            const storedCart = getShoppingCart();

            const savedCart = [];
            for(const id in storedCart){
                const addedProduct = products.find(pd => pd.id === id);
                if(addedProduct){
                    const   quantity = storedCart[id];
                    addedProduct.quantity = quantity;
                    savedCart.push(addedProduct);

                }
            }
            
            // if we need return more than 1 thing then we can return an array or an object 
            // [products,savedCart]
            // {products: pruducts, savedCart: savedCart}
        return savedCart;

}


export default cartProductsLoader;