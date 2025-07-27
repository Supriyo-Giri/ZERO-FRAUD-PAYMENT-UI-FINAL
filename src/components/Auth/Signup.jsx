import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    institution: '',
    role: 'student'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleChange = (role) => {
    setFormData({
      ...formData,
      role: role
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup data:', formData);
    if (formData.role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/student-dashboard');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left-panel">
          <div className="logo">
            <i className="fas fa-cube"></i>
            <h1 className='Want-white'>Zero-Fraud-Payment-UI</h1>
          </div>
          <div className="welcome-text">
            <h2 className='Want-white'>Welcome to the Future of Learning</h2>
            <p>Access your personalized dashboard with cutting-edge tools designed to enhance your educational experience.</p>
          </div>
          <div className="features">
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <div className="feature-content">
                <h3 className='Want-white'>Student Portal</h3>
              </div>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-user-shield"></i>
              </div>
              <div className="feature-content">
                <h3 className='Want-white'>Admin Dashboard</h3>
              </div>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="feature-content">
                <h3 className='Want-white'>Performance Tracking</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="auth-right-panel">
          <div className="form-header">
            <h2>Get Started</h2>
            <p>Sign in to your account or create a new one</p>
          </div>
          <div className="login-options">
            <div 
              className={`login-option student ${formData.role === 'student' ? 'active' : ''}`}
              onClick={() => handleRoleChange('student')}
            >
              <i className="fas fa-user-graduate"></i>
              <h3>Student</h3>
              <p>Login as a student</p>
            </div>
            <div 
              className={`login-option admin ${formData.role === 'admin' ? 'active' : ''}`}
              onClick={() => handleRoleChange('admin')}
            >
              <i className="fas fa-user-shield"></i>
              <h3>Admin</h3>
              <p>Login as administrator</p>
            </div>
          </div>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <div className="input-group">
                  <i className="fas fa-user"></i>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    className="form-control" 
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-group">
                  <i className="fas fa-envelope"></i>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    className="form-control" 
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
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
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="institution">Institution</label>
                <div className="input-group">
                  <i className="fas fa-building"></i>
                  <input 
                    type="text" 
                    id="institution" 
                    name="institution"
                    className="form-control" 
                    placeholder="Enter your institution name"
                    value={formData.institution}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Sign Up as {formData.role === 'student' ? 'Student' : 'Administrator'}
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
                Already have an account? <a href="/login">Sign In</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;