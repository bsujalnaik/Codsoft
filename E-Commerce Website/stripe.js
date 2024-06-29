const stripe = require('stripe')(config.stripeSecretKey);

// Example: Create a payment intent
exports.createPaymentIntent = async (amount, currency = 'usd') => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount in cents
      currency,
    });
    return paymentIntent;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../services/api';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function CheckoutPage() {
  const stripe = useStripe();
  const elements = useElements();
  const [formData, setFormData] = useState({
    // Form data as in the previous example
  });

  const history = useHistory();

  const handleInputChange = (e) => {
    // Handle input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create payment intent and handle payment submission with Stripe
    try {
      const response = await axios.post('/orders', formData);
      const clientSecret = response.data.client_secret; // Assume backend returns client_secret
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData.fullName,
          },
        },
      });
      if (paymentResult.error) {
        console.error('Payment failed:', paymentResult.error.message);
        // Handle payment failure (e.g., display error message)
      } else {
        console.log('Payment successful:', paymentResult.paymentIntent);
        // Handle successful payment (e.g., redirect to order confirmation)
        history.push('/order-confirmation');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields as in the previous example */}
        <label>Credit Card Information</label>
        <CardElement />

        <button type="submit" disabled={!stripe}>Place Order</button>
      </form>
    </div>
  );
}

export default CheckoutPage;
