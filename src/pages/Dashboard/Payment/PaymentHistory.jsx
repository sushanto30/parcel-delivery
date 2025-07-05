import React, { useContext } from 'react';
import { AuthContext } from '../../../Auth/AuthContext';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {

    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    const { data: payments =[] } = useQuery({
        queryKey: ['payment', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`)
            return res.data
        }
    })

    console.log('all payment', payments)


    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">📦 Parcel Payment History</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-200 rounded">
                    <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                        <tr>
                            <th className="py-3 px-4 border">#</th>
                            <th className="py-3 px-4 border">Parcel ID</th>
                            <th className="py-3 px-4 border">Amount ($)</th>
                            <th className="py-3 px-4 border">Date</th>
                            <th className="py-3 px-4 border">Transaction ID</th>
                            <th className="py-3 px-4 border">Payment Method</th>
                            <th className="py-3 px-4 border">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id} className="text-sm text-gray-700 hover:bg-gray-50 transition">
                                <td className="py-2 px-4 border">{index + 1}</td>
                                <td className="py-2 px-4 border font-mono">{payment.parcelId}</td>
                                <td className="py-2 px-4 border text-green-600 font-semibold">${payment.amount}</td>
                                <td className="py-2 px-4 border">{new Date(payment.date_at).toLocaleString()}</td>
                                <td className="py-2 px-4 border font-mono text-blue-700">{payment.transactionId}</td>
                                <td className="py-2 px-4 border font-mono">{payment.paymentMethod}</td>
                                <td className="py-2 px-4 border">{payment.email}</td>
                            </tr>
                        ))}
                        {payments.length === 0 && (
                            <tr>
                                <td colSpan="7" className="py-6 text-center text-gray-500 italic">
                                    No payment history found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;