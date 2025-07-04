import React from 'react';
import {
    FaShippingFast,
    FaMapMarkedAlt,
    FaBoxes,
    FaHandHoldingUsd,
    FaBuilding,
    FaUndo
} from 'react-icons/fa';
const ourServices = [
    {
        icon: <FaShippingFast className="text-4xl text-blue-600" />,
        title: "Express & Standard Delivery",
        description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off."
    },
    {
        icon: <FaMapMarkedAlt className="text-4xl text-green-600" />,
        title: "Nationwide Delivery",
        description: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours."
    },
    {
        icon: <FaBoxes className="text-4xl text-yellow-500" />,
        title: "Fulfillment Solution",
        description: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support."
    },
    {
        icon: <FaHandHoldingUsd className="text-4xl text-red-500" />,
        title: "Cash on Home Delivery",
        description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product."
    },
    {
        icon: <FaBuilding className="text-4xl text-purple-600" />,
        title: "Corporate Service / Contract In Logistics",
        description: "Customized corporate services which includes warehouse and inventory management support."
    },
    {
        icon: <FaUndo className="text-4xl text-pink-500" />,
        title: "Parcel Return",
        description: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants."
    }
];

const Services = () => {
    return (
        <section className="px-8 py-24 bg-[#03373D] rounded-4xl mt-16">
            <h2 className="text-3xl font-bold text-center text-white mb-4">Our Services</h2>
            <p className='text-white text-center mb-10'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to <br /> business shipments — we deliver on time, every time.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ourServices.map((service, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-md p-6 hover:bg-[#CAEB66] transition duration-300 flex flex-col items-center text-center"
                    >
                        {service.icon}
                        <h3 className="text-xl font-semibold mt-4 mb-2">{service.title}</h3>
                        <p className="text-gray-700">{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;