import React from 'react';
import { Link, Outlet } from 'react-router';
import authImg from './../../../src/assets/authImage.png'

const AuthPages = () => {
    return (
        <div className='container mx-auto mt-6'>
            <Link to={'/'}>
                <div className='flex items-end'>
                    <img className='w-8' src="./../../../../src/assets/logo.png" alt="" />
                    <h1 className='text-2xl -ml-3 font-bold'>ProFast</h1>
                </div>
            </Link>
            <div className='flex  justify-center items-center mt-10'>
                <div className='flex-1 '>
                    <Outlet></Outlet>
                </div>

                <div className='flex-1 bg-[#FAFDF0] rounded-r-xl'>
                    <img className='w-full p-12' src={authImg} alt="" />
                </div>

            </div>
        </div>
    );
};

export default AuthPages;