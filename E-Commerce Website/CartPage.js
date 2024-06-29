import React from 'react';

function CartPage() {
  // Assume cartItems is fetched from localStorage or session storage
  const cartItems = []; // Example: Replace with actual logic to fetch cart items

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button>Remove</button>
            </div>
          ))}
          <button>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
