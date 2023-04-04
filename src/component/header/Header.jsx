import React from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div className='header'>
            <img src={logo} alt="" />
            
            <nav className='menu'>
                {/* akhane tailwind install nai ti isActive er class ta kaj kortecena */}
            <NavLink
                     to='/'
                     className={({ isActive }) => isActive ? 'active': ''
                        
                     }
                   >
                   Shop
                </NavLink>
            <NavLink
                     to='/orders'
                     className={({ isActive }) => isActive ? 'active': ''
                        
                     }
                   >
                  Order
                </NavLink>
            <NavLink
                     to='/inventory'
                     className={({ isActive }) => isActive ? 'active': ''
                        
                     }
                   >
                   Inventory
                </NavLink>
            <NavLink
                     to='/login'
                     className={({ isActive }) => isActive ? 'active': ''
                        
                     }
                   >
                   Login
                </NavLink>
                
               
                
            </nav>
        </div>
    );
};

export default Header;