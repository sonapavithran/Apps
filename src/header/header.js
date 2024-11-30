// Header.js
import React from 'react';
import './header.css';

function Header({ setCategory, category }) {
  return (
    <header className="header">
      <h1 className="header-title">Product Dashboard</h1>
      <nav className="category-nav">
        <ul>
          <li 
            className={category === 'all' ? 'active' : ''} 
            onClick={() => setCategory('all')}
          >
            ALL
          </li>
          <li 
            className={category === 'electronics' ? 'active' : ''} 
            onClick={() => setCategory('electronics')}
          >
            ELECTRONICS
          </li>
          <li 
            className={category === 'jewelery' ? 'active' : ''} 
            onClick={() => setCategory('jewelery')}
          >
            JEWELRY
          </li>
          <li 
            className={category === "men's clothing" ? 'active' : ''} 
            onClick={() => setCategory("men's clothing")}
          >
            MEN'S CLOTHING
          </li>
          <li 
            className={category === "women's clothing" ? 'active' : ''} 
            onClick={() => setCategory("women's clothing")}
          >
            WOMEN'S CLOTHING
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
