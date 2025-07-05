import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { AuthContext } from '../../../Auth/AuthContext';
import Swal from 'sweetalert2';

const PaymentFrom = () => {


    const stripe = useStripe()
    const element = useElements()
    const axiosSecure = useAxiosSecure()

    const [messages, setMessages] = useState()

    const { id } = useParams()
    console.log(id)
    const { user } = useContext(AuthContext)
    const navigate =useNavigate()

    const { data: oneParcel } = useQuery({
        queryKey: ['paymentId', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`parcels/${id}`)
            return res.data
        }
    })

    const amount = oneParcel?.cost
    console.log(amount)



    const handlePayment = async (e) => {
        e.preventDefault()

        if (!stripe || !element) {
            return
        }

        const card = element.getElement(CardElement)

        if (!card) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setMessages(error.message)
        } else {
            setMessages('')
            console.log('payment ', paymentMethod)
        }


        const res = await axiosSecure.post('/create-payment-intent', {
            amount,
        })
        console.log(res.data.client_secret)

        const clientSecret = res.data.client_secret

        const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: 'Test User', // optional
                },
            },
        });

        if (error) {
            console.error('❌ Payment failed:', error.message);
        } else if (paymentIntent.status === 'succeeded') {
            console.log('✅ Payment successful!');

            const paymentData = {
                parcelId: oneParcel._id,
                amount: oneParcel.cost,
                transactionId: paymentIntent.id,
                paymentMethod: paymentIntent.payment_method,
                email: user?.email,
                date_at: new Date()
            }

            const paymentRes = await axiosSecure.post('/payments', paymentData)

            console.log(paymentRes)
            Swal.fire({
                icon: 'success',
                title: 'Payment Successful!',
                text: 'Your parcel has been paid successfully.',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Go to My Parcels',
            }).then(() => {
                navigate('/dashboard/myParcel'); // ✅ redirect here
            });




        }





    }

    return (
        <div className="max-w-md   mt-10 p-6 bg-white rounded-lg shadow">
            <form onSubmit={handlePayment} className="space-y-4">
                <label className="block text-gray-700 font-medium">Card Information</label>
                <div className="border border-gray-300 bg-gray-50 rounded-md p-4 focus-within:ring-2 focus-within:ring-blue-500 transition">
                    <CardElement
                        // options={CARD_ELEMENT_OPTIONS}
                        className="StripeElement bg-transparent w-full"
                    />
                </div>

                <button
                    type="submit"
                    disabled={!stripe}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                >
                    Pay Now
                </button>
                {
                    messages && <p className='text-red-500 text-sm'>{messages}</p>
                }
            </form>
        </div>
    );
};

export default PaymentFrom;