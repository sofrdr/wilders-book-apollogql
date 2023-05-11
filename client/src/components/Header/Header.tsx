import React from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
   const navigate = useNavigate();

   const logout = () => {
      localStorage.removeItem('token');
      navigate('/sign-in');
   };
   return (
      <header>
         <div className="container flex-header">
            <Link to="/">
               <h1>Wilders Book</h1>
            </Link>
            <button onClick={logout} className="button">
               Logout
            </button>
         </div>
      </header>
   );
};

export default Header;
