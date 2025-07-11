import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import Swal from 'sweetalert2';

const PendingRider = () => {

    const axiosSecure = useAxiosSecure()

    const { data: riders = [], refetch } = useQuery({
        queryKey: ['Riders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allRiders')
            return res.data
        }
    })

    // console.log(riders)

    const handleApproved = (id,email) => {

        // console.log(email)


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/updateRider/${id}`, {email})
                    .then(res => {
                        if (res.data.modifiedCount) {
                            refetch()
                            Swal.fire({
                                title: "Approved!",
                                text: "Your file has been approved.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
 
            }
        });

       
    }





    return (
        <div className="overflow-x-auto mt-6">
            <h2 className="text-xl font-semibold mb-4">Pending Riders</h2>
            <table className="table-auto w-full border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-2 py-2">#</th>
                        <th className="border px-2 py-2">Name</th>
                        <th className="border px-2 py-2">Email</th>
                        <th className="border px-2 py-2">District</th>
                        <th className="border px-2 py-2">Age</th>
                        <th className="border px-2 py-2">NID</th>
                        <th className="border px-2 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {riders.map((rider, index) => (
                        <tr key={rider._id}>
                            <td className="border px-2 py-1 text-center">{index + 1}</td>
                            <td className="border px-2 py-1">{rider.fullName}</td>
                            <td className="border px-2 py-1">{rider.email}</td>
                            <td className="border px-2 py-1">{rider.district}</td>
                            <td className="border px-2 py-1 text-center">{rider.age}</td>
                            <td className="border px-2 py-1">{rider.nid}</td>
                            <td className="border px-2 py-1 flex flex-col gap-1">
                                <button
                                    onClick={() => alert(JSON.stringify(rider, null, 2))}
                                    className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                                >
                                    View
                                </button>
                                <button
                                    //   onClick={() => approveRider.mutate(rider._id)}
                                    onClick={() => handleApproved(rider._id , rider.email )}
                                    className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                                >
                                    Approve
                                </button>
                                <button

                                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PendingRider;