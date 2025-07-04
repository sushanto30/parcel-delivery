import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../../Auth/AuthContext';

const Navbar = () => {

    const { handleSignOut, user}=use(AuthContext)

    const navLink = <>

        <li> <NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/about'}>About</NavLink></li>
        <li><NavLink to={'/addParcels'}>AddParcels</NavLink></li>

        {
            user && <>
             <li><NavLink to={'/dashboard'}>DashBoard</NavLink></li>
            </>
        }
        

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
                <div className='flex items-end'>
                    <img className='w-8' src="./../../../../src/assets/logo.png" alt="" />
                    <h1 className='text-2xl -ml-3 font-bold'>ProFast</h1>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLink}
                </ul>
            </div>
            <div className="navbar-end">
               {
                user?  <button className='btn' onClick={()=>handleSignOut()}><Link>Log out</Link></button> :  <button className='btn'><Link to={'/login'}>Login</Link></button>
               }
            </div>
        </div>
    );
};

export default Navbar;