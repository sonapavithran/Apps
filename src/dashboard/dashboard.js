import React, { useState } from 'react';
import { FaHome, FaEnvelope, FaFolder, FaCog, FaBars, FaBell, FaShoppingCart } from 'react-icons/fa';
import './dashboard.css';

import logo from '../logos/mecwinlogo.png';
import img1 from '../image/img1.jpg';
import img2 from '../image/img2.jpg';
import img3 from '../image/img3.jpg';
import Product from '../product/product';

function Header() {
    const [notificationCount, setNotificationCount] = useState(5);  
    const [cartCount, setCartCount] = useState(3);
  return (
    <header className="dashboard-header">
      <img src={logo} alt="Logo" className="logos" />
      <h1 className="header-title"></h1>

      <div className="header-icons">
        <div className="icon-container">
          <FaBell size={24} />
          {notificationCount > 0 && (
            <span className="notification-badge">{notificationCount}</span>
          )}
        </div>

        <div className="icon-container">
          <FaShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </div>
      </div>
    </header>
  );
}

function Sidebar({ isExpanded, toggleSidebar }) {
  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <nav>
        <ul>
          <li>
            <FaHome />
            {isExpanded && <span>Home</span>}
          </li>
          <li>
            <FaEnvelope />
            {isExpanded && <span>Messages</span>}
          </li>
          <li>
            <FaFolder />
            {isExpanded && <span>Contents</span>}
          </li>
          <li>
            <FaCog />
            {isExpanded && <span>Settings</span>}
          </li>
        </ul>
      </nav>
    </div>
  );
}

function Dashboard() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  return (
    <div className="dashboard-container">
      <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <Header />
        <Product/>
        <div className="dashboard-content">
         {/* <Product/> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
