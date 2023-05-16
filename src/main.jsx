import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './component/shop/Shop';
import Home from './component/home/Home';
import Orders from './component/orders/Orders';
import Inventory from './component/inventory/Inventory';
import Login from './component/Login/Login';
import cartProductsLoader from './loaders/cartProductsLoader';
import Checkout from './component/checkout/Checkout';
import SignUp from './component/signUp/SignUp';
import AuthProvider from './component/Provider/AuthProvider';
import PrivateRoute from './component/routes/PrivateRoute';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    children:[
      {
        path:'/',
        element: <Shop></Shop>,
        loader: () => fetch('http://localhost:5000/totalProducts')
      },
      {
        path: '/orders',
        element: <Orders></Orders>,
        loader: cartProductsLoader
      },
      {
        path: 'inventory',
        element: <Inventory></Inventory>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
      {
        path: '/checkout',
        element: <PrivateRoute><Checkout></Checkout></PrivateRoute> 
      },
      {
        path: '*',
        element: <h1>404 Not Found</h1>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  
  </React.StrictMode>,
)
