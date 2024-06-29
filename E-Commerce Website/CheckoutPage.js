import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../services/api';

function CheckoutPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'Stripe', // Example: Assume Stripe is the default payment method
  });

  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assume '/api/orders' endpoint exists for placing orders
      const response = await axios.post('/orders', formData);
      console.log('Order placed successfully:', response.data);
      // Redirect to order confirmation page or handle success message
      history.push('/order-confirmation');
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />

        <label>Address</label>
        <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />

        <label>City</label>
        <input type="text" name="city" value={formData.city} onChange={handleInputChange} required />

        <label>Postal Code</label>
        <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required />

        <label>Country</label>
        <input type="text" name="country" value={formData.country} onChange={handleInputChange} required />

        <label>Payment Method</label>
        <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}>
          <option value="Stripe">Stripe</option>
          {/* Add other payment methods here */}
        </select>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default CheckoutPage;
