import React from 'react';
import {
    FaTruck,
    FaMoneyBillWave,
    FaWarehouse,
    FaBriefcase
} from 'react-icons/fa';

const WorkSection = () => {




    const workItems = [
        {
            icon: <FaTruck className="text-4xl text-blue-600" />,
            title: 'Booking Pick & Drop',
            description: 'From personal packages to business shipments — we deliver on time, every time.'
        },
        {
            icon: <FaMoneyBillWave className="text-4xl text-green-600" />,
            title: 'Cash On Delivery',
            description: 'From personal packages to business shipments — we deliver on time, every time.'
        },
        {
            icon: <FaWarehouse className="text-4xl text-orange-500" />,
            title: 'Delivery Hub',
            description: 'From personal packages to business shipments — we deliver on time, every time.'
        },
        {
            icon: <FaBriefcase className="text-4xl text-purple-600" />,
            title: 'Booking SME & Corporate',
            description: 'From personal packages to business shipments — we deliver on time, every time.'
        }
    ];
    return (
        <section className="p-6   mt-10">
            <h2 className="text-3xl font-bold   mb-8">How it Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {workItems.map((item, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-md p-6 flex flex-col    hover:shadow-xl transition-shadow ">
                        {item.icon}
                        <h3 className="mt-4 text-xl font-semibold text-[#03373D]">{item.title}</h3>
                        <p className="mt-2 text-gray-600">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WorkSection;