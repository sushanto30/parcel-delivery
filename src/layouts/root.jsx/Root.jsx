import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../pages/shared/Navbar/Navbar';
import Footer from '../../pages/shared/Footer/Footer';

const Root = () => {
    return (
        <div className=' bg-gray-200'>
            <div className='container mx-auto'>
                <Navbar></Navbar>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Root;