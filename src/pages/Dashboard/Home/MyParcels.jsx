import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Auth/AuthContext';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyParcels = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], isLoading, error, refetch} = useQuery({
        queryKey: ['my-parcel', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    });


console.log(parcels)


    if (!user) return <p>Login first to see your parcels.</p>;
    if (isLoading) return <p>Loading parcels...</p>;
    if (error) return <p>Error loading parcels: {error.message}</p>;


    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/parcels/${id}`);
                    console.log(res.data)
                    if (res.data.deletedCount > 0) {
                        Swal.fire('Deleted!', 'Your parcel has been deleted.', 'success');
                        refetch(); // data refetch
                    }
                } catch {
                    Swal.fire('Error!', 'Something went wrong.', 'error');
                }
            }
        });
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">My Parcels</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border">Type</th>
                            <th className="py-2 px-4 border">Cost (৳)</th>
                            <th className="py-2 px-4 border">Payment Status</th>
                            <th className="py-2 px-4 border">Created At</th>
                            <th className="py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.length > 0 ? parcels.map(parcel => (
                            <tr key={parcel._id} className="text-center border-t">
                                <td className="py-2 px-4 border">{parcel.type}</td>
                                <td className="py-2 px-4 border">{parcel.cost}</td>
                                <td className="py-2 px-4 border">
                                    <span className={`px-2 py-1 rounded text-white ${parcel.payment_status === 'Paid' ? 'bg-green-500' : 'bg-red-500'
                                        }`}>
                                        {parcel.payment_status}
                                    </span>
                                </td>
                                <td className="py-2 px-4 border">
                                    {new Date(parcel.createdAt).toLocaleString('bn-BD', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </td>
                                <td className="py-2 px-4 border space-x-2">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">View</button>
                                    <Link to={`/dashboard/payment/${parcel._id}`}><button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Pay</button></Link>
                                    <button onClick={()=>handleDelete(parcel._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="py-4 text-gray-500">No parcels found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcels;
