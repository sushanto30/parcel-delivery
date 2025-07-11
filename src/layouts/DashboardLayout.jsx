import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { FaBox, FaMapMarkedAlt, FaUserEdit, FaShippingFast, FaHistory, FaPlusCircle, FaHome, FaUserCheck, FaUserClock } from 'react-icons/fa';
import ProFast from '../pages/shared/Navbar/ProFast';

const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col  ">
                {/* Page content here */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2"> Dashboard</div>

                </div>
                {/* Page content here */}
                <Outlet></Outlet>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className='m-5'>
                    <ProFast></ProFast>
                </div>
                <ul className="menu bg-base-200 text-base-content min-h-full w-40 lg:w-80 p-4">
                    {/* Sidebar content here */}
                    <li>
                        <NavLink to="/" className="flex items-center space-x-2">
                            <FaHome />
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myParcel" className="flex items-center space-x-2">
                            <FaBox />
                            <span>My Parcel</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/trackParcel" className="flex items-center space-x-2">
                            <FaMapMarkedAlt />
                            <span>Track Parcel</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/updateProfile" className="flex items-center space-x-2">
                            <FaUserEdit />
                            <span>Update Profile</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/sendParcel" className="flex items-center space-x-2">
                            <FaShippingFast />
                            <span>Send Parcel</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/parcelHistory" className="flex items-center space-x-2">
                            <FaHistory />
                            <span>Parcel History</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/newBooking" className="flex items-center space-x-2">
                            <FaPlusCircle />
                            <span>New Booking</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/ActiveRider" className="flex items-center space-x-2">
                            <FaUserCheck /> {/* Active Rider Icon */}
                            <span>Active Rider</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/pendingRider" className="flex items-center space-x-2">
                            <FaUserClock /> {/* Pending Rider Icon */}
                            <span>Pending Rider</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;