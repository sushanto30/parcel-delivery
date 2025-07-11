import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ActiveRider = () => {

    const axiosSecure = useAxiosSecure()

    const { data: riders = [],   } = useQuery({
        queryKey: ['Riders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allActiveRiders')
            return res.data
        }
    })




    return (
        <div className="overflow-x-auto mt-6">
            <h2 className="text-xl font-semibold mb-4">Active Riders</h2>
            <table className="table-auto w-full border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-2 py-2">#</th>
                        <th className="border px-2 py-2">Name</th>
                        <th className="border px-2 py-2">Email</th>
                        <th className="border px-2 py-2">District</th>
                        <th className="border px-2 py-2">Area</th>
                        <th className="border px-2 py-2">Age</th>
                    </tr>
                </thead>
                <tbody>
                    {riders.map((rider, index) => (
                        <tr key={rider._id}>
                            <td className="border px-2 py-1 text-center">{index + 1}</td>
                            <td className="border px-2 py-1">{rider.fullName}</td>
                            <td className="border px-2 py-1">{rider.email}</td>
                            <td className="border px-2 py-1">{rider.district}</td>
                            <td className="border px-2 py-1">{rider.covered_area}</td>
                            <td className="border px-2 py-1 text-center">{rider.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ActiveRider;