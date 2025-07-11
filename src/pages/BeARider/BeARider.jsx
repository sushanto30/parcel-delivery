import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaMotorcycle } from 'react-icons/fa';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../Auth/AuthContext';

import useAxiosSecure from '../../hook/useAxiosSecure';
import Swal from 'sweetalert2';



const BeARider = () => {

    const locationData = useLoaderData()
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [availableRegions, setAvailableRegions] = useState([]);
    const [filteredDistricts, setFilteredDistricts] = useState([]);

    const selectedRegion = watch("region");

    // Region লিস্ট সেট করা
    useEffect(() => {
        const uniqueRegions = [...new Set(locationData.map(item => item.region))];
        setAvailableRegions(uniqueRegions);
    }, []);

    // Region পরিবর্তন হলে District আপডেট করা
    useEffect(() => {
        if (selectedRegion) {
            const districts = locationData
                .filter(item => item.region === selectedRegion)
                .map(item => item.district);
            setFilteredDistricts(districts);
        } else {
            setFilteredDistricts([]);
        }
    }, [selectedRegion]);

    const onSubmit = (data) => {
        console.log("Form Data:", data);

        const fromData = {
            ...data,
            role: "rider",
            email : user?.email,
            create_at: new Date().toISOString(),
            status: "pending",
        }

        axiosSecure.post('/riders', fromData).then(res => {
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
            .catch(error => {
                console.log(error)
            })




        // alert("Submitted!");
        reset();
    };

    return (
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6 mt-10 border">
            <div className="flex items-center gap-3 mb-4">
                <FaMotorcycle className="text-2xl text-blue-600" />
                <h2 className="text-xl font-semibold">Become a Rider</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
                {/* Full Name */}
                <div>
                    <label className="block mb-1">Full Name</label>
                    <input value={user?.displayName} {...register('fullName', { required: true })} className="w-full border px-3 py-2 rounded" />
                    {errors.fullName && <p className="text-red-500 text-sm">Full Name is required</p>}
                </div>

                {/* Age */}
                <div>
                    <label className="block mb-1">Age</label>
                    <input type="number" {...register('age', { required: true, min: 18 })} className="w-full border px-3 py-2 rounded" />
                    {errors.age && <p className="text-red-500 text-sm">Age must be 18+</p>}
                </div>

                {/* NID */}
                <div>
                    <label className="block mb-1">NID Number</label>
                    <input {...register('nid', { required: true })} className="w-full border px-3 py-2 rounded" />
                    {errors.nid && <p className="text-red-500 text-sm">NID is required</p>}
                </div>

                {/* Phone */}
                <div>
                    <label className="block mb-1">Phone</label>
                    <input {...register('phone', {
                        required: true,

                    })} className="w-full border px-3 py-2 rounded" />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                </div>

                {/* Region */}
                <div>
                    <label className="block mb-1">Region</label>
                    <select {...register('region', { required: true })} className="w-full border px-3 py-2 rounded">
                        <option value="">Select Region</option>
                        {availableRegions.map(region => <option key={region} value={region}>{region}</option>)}
                    </select>
                </div>

                {/* District */}
                <div>
                    <label className="block mb-1">District</label>
                    <select {...register('district', { required: true })} className="w-full border px-3 py-2 rounded">
                        <option value="">Select District</option>
                        {filteredDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>



                {/* Submit */}
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
                    Apply Now
                </button>
            </form>
        </div>
    );
};

export default BeARider;
