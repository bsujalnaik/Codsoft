import React, { useEffect, useState } from 'react';
import axios from '../services/api';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product._id} className="product-item">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <img src={product.imageUrl} alt={product.name} />
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
