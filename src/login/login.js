import React, { useState } from 'react';
import './login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from '../logos/mecwinlogo.png';
import background from '../image/background.png.png';
import loginIcon from '../image/log.png';

function Login() {
  // Define the state for showing password
  const [showPassword, setShowPassword] = useState(false);

  // Define the function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${background})` }}>
      <header className="header">
        <img src={logo} alt="Mecwin Logo" className="logo" />
      </header>
      
      <div className="login-box">
        <h1>Welcome to Mecwin<br />Order Management System</h1>
        <p>Let's Log you back in to begin!</p>
        <img src={loginIcon} alt="Login Icon" className="login-icon" />

        <form className="login-form">
          <input type="text" placeholder="Username Email or Phone" required />
          
          {/* Password Input with Eye Icon */}
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Your Password"
              required
            />
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          
          <button type="submit" className="login-button">Login</button>
          <button type="button" className="signup-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
