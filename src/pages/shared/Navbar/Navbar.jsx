import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../../Auth/AuthContext';
import { FaHome, FaInfoCircle, FaMotorcycle, FaPlusSquare, FaTachometerAlt } from 'react-icons/fa';
import ProFast from './ProFast';

const Navbar = () => {

    const { handleSignOut, user } = use(AuthContext)

    const navLink = <>

        <li>
            <NavLink to="/" className="flex items-center space-x-2">
                <FaHome />
                <span>Home</span>
            </NavLink>
        </li>
        <li>
            <NavLink to="/about" className="flex items-center space-x-2">
                <FaInfoCircle />
                <span>About</span>
            </NavLink>
        </li>
        <li>
            <NavLink to="/addParcels" className="flex items-center space-x-2">
                <FaPlusSquare />
                <span>Add Parcels</span>
            </NavLink>
        </li>

        <li>
            <NavLink to="/beArider" className="flex items-center space-x-2">
                <FaMotorcycle />
                <span>Rider Parcels</span>
            </NavLink>
        </li>

        {user && (
            <li>
                <NavLink to="/dashboard" className="flex items-center space-x-2">
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </NavLink>
            </li>
        )}


    </>

    // const handleLogOut = ()=>{

    // }
    console.log(user?.email)



    return (
        <div className="navbar bg-base-100 shadow-sm rounded-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navLink}
                    </ul>
                </div>
                <ProFast></ProFast>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLink}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <button className='btn' onClick={() => handleSignOut()}><Link>Log out</Link></button> : <button className='btn'><Link to={'/login'}>Login</Link></button>
                }
            </div>
        </div>
    );
};

export default Navbar;