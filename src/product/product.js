import React, { useState, useEffect } from 'react';
import './product.css';

function Product() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = category === 'all'
    ? products
    : products.filter(product => product.category === category);

  return (
    <div className="product-page">
      <div className="category-header">
        <button
          className={category === 'all' ? 'active-button' : ''}
          onClick={() => setCategory('all')}
        >
          ALL
        </button>
        <button
          className={category === 'electronics' ? 'active-button' : ''}
          onClick={() => setCategory('electronics')}
        >
          ELECTRONICS
        </button>
        <button
          className={category === 'jewelery' ? 'active-button' : ''}
          onClick={() => setCategory('jewelery')}
        >
          JEWELRY
        </button>
        <button
          className={category === "men's clothing" ? 'active-button' : ''}
          onClick={() => setCategory("men's clothing")}
        >
          MEN'S CLOTHING
        </button>
        <button
          className={category === "women's clothing" ? 'active-button' : ''}
          onClick={() => setCategory("women's clothing")}
        >
          WOMEN'S CLOTHING
        </button>
      </div>
      
      <div className="product-container">
        {filteredProducts.map((product) => (
          <div className="product-box" key={product.id}>
            <img src={product.image} alt={product.title} className="product-image" />
            <div className="product-overlay">
              <h2 className="product-title">{product.title}</h2>
              <span className="product-price">${product.price}</span>
              <button className="add-to-cart-button">ADD TO CART</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
