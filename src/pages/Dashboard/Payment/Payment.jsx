import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import PaymentFrom from './PaymentFrom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY)

const Payment = () => {
    return (
         <Elements stripe={stripePromise}>
            <PaymentFrom></PaymentFrom>
         </Elements>
    );
};

export default Payment;