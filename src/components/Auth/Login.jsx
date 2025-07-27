// src/components/Auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/login.css"

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  // 3. Implement Role Selection Logic
  const [selectedRole, setSelectedRole] = useState('student'); // Default to student

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle role selection (Student/Admin)
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Login logic will be implemented later with backend API
    console.log('Login data:', formData, 'Role:', selectedRole);
    
    // 4. Update Redirect Logic based on selected role
    if (selectedRole === 'admin') {
      navigate('/admin-dashboard');
    } else {
      // Default to student dashboard
      navigate('/student-dashboard');
    }
  };

  return (
    // 1. & 2. Update JSX Structure and Styling
    <div className="auth-page">
      <div className="container">
        <div className="left-panel">
          <div className="logo">
            <i className="fas fa-cube"></i>
            <h1>Zero-Fraud-payment-UI</h1>
          </div>
          <div className="welcome-text">
            <h2>Welcome to the Future of Payments</h2>
            <p>Access your personalized dashboard with cutting-edge tools designed to enhance your experience.</p>
          </div>
          <div className="features">
            <div className="feature">
              <i className="fas fa-graduation-cap"></i>
              <div>
                <h3>Student Portal</h3>
          
              </div>
            </div>
            <div className="feature">
              <i className="fas fa-user-shield"></i>
              <div>
                <h3>Admin Dashboard</h3>
               
              </div>
            </div>
            <div className="feature">
              <i className="fas fa-chart-line"></i>
              <div>
                <h3>Performance Tracking</h3>
    
              </div>
            </div>
          </div>
        </div>
        <div className="right-panel">
          <div className="form-header">
            <h2>Get Started</h2>
            <p>Sign in to your account or create a new one</p>
          </div>
          {/* Role selection buttons */}
          <div className="login-options">
            <div
              className={`login-option student ${selectedRole === 'student' ? 'active' : ''}`}
              onClick={() => handleRoleSelect('student')}
            >
              <i className="fas fa-user-graduate"></i>
              <h3>Student</h3>
              <p>Login as a student</p>
            </div>
            <div
              className={`login-option admin ${selectedRole === 'admin' ? 'active' : ''}`}
              onClick={() => handleRoleSelect('admin')}
            >
              <i className="fas fa-user-shield"></i>
              <h3>Admin</h3>
              <p>Login as administrator</p>
            </div>
          </div>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-group">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-group">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="remember-forgot">
                <div className="remember">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <a href="#" className="forgot-password">Forgot Password?</a>
              </div>

              <button type="submit" className="btn">
                Sign In as {selectedRole === 'student' ? 'Student' : 'Administrator'}
              </button>

              <div className="divider">
                <div className="line"></div>
                <span>or continue with</span>
                <div className="line"></div>
              </div>
              <div className="social-login">
                <div className="social-btn">
                  <i className="fab fa-google"></i>
                  <span>Google</span>
                </div>
                <div className="social-btn">
                  <i className="fab fa-microsoft"></i>
                  <span>Microsoft</span>
                </div>
              </div>
              <div className="signup-link">
                Don't have an account? <a href="/signup">Sign Up</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;