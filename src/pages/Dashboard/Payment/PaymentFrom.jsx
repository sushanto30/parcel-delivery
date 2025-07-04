import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const PaymentFrom = () => {

    const stripe = useStripe()
    const element = useElements()

    const [messages , setMessages]=useState()


    const handlePayment = async(e)=>{
        e.preventDefault()

        if(!stripe || !element){
            return
        }

        const card = element.getElement(CardElement)

        if(!card){
            return
        }

        const {error ,paymentMethod}=await stripe.createPaymentMethod({
            type:'card',
            card
        })

        if(error){
            setMessages(error.message)
        }else{
            console.log('payment ', paymentMethod)
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
            messages&& <p className='text-red-500 text-sm'>{messages}</p>
        }
      </form>
    </div>
    );
};

export default PaymentFrom;