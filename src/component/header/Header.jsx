import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Header = () => {

  const { user, logOut} = useContext(AuthContext);


  const handleLogOut = ()=> {
    logOut()
    .then( () => {})
    .catch(er => {
      console.log(er.message);
    })
  }

  return (
    <div className='header'>
      <img src={logo} alt="" />

      <nav className='menu'>
        {/* akhane tailwind install nai ti isActive er class ta kaj kortecena */}
        <NavLink
          to='/'
          className={({ isActive }) => isActive ? 'active' : ''

          }
        >
          Shop
        </NavLink>
        <NavLink
          to='/orders'
          className={({ isActive }) => isActive ? 'active' : ''

          }
        >
          Order
        </NavLink>
        <NavLink
          to='/inventory'
          className={({ isActive }) => isActive ? 'active' : ''

          }
        >
          Inventory
        </NavLink>
        <NavLink
          to='/login'
          className={({ isActive }) => isActive ? 'active' : ''

          }
        >
          Login
        </NavLink>
        <NavLink
          to='/signup'
          className={({ isActive }) => isActive ? 'active' : ''

          }
        >
          Sign Up
        </NavLink>
        {
          user && <span style={{color:'white'}}>Welcome {user.email} <button onClick={handleLogOut}>Log Out</button></span> 
        }

      </nav>
      
      
    </div>
  );
};

export default Header;