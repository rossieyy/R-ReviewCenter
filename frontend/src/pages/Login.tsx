import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../utils/hooks';
import { loginRules } from '../utils/validation';
import { LoginForm } from '../types';
import '../styles/Auth.css';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const initialValues: LoginForm = {
    email: '',
    password: '',
    rememberMe: false
  };

  const handleLogin = async (values: LoginForm) => {
    try {
      // TODO: Implement actual login logic here
      console.log('Login attempt:', { ...values, password: '***' });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Handle successful login (redirect, store token, etc.)
      alert('Login successful! (This is a demo)');
      navigate('/');
      
    } catch (error) {
      console.error('Login error:', error);
      setFieldError('general', 'Login failed. Please check your credentials and try again.');
    }
  };

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFieldError
  } = useForm(initialValues, loginRules, handleLogin);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    handleChange(name as keyof LoginForm, type === 'checkbox' ? checked : value);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="logo-section">
              <div className="auth-logo">RRC</div>
              <h1>Welcome Back</h1>
              <p>Sign in to your Rosarian Review Center account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {errors.general && (
              <div className="error-banner">
                {errors.general}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email"
                disabled={isSubmitting}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleInputChange}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
                disabled={isSubmitting}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={values.rememberMe}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
                <span className="checkbox-text">Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            <button 
              type="submit" 
              className={`auth-button ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register" className="auth-link">Sign up</Link></p>
          </div>
        </div>

        <div className="auth-info">
          <div className="info-content">
            <h2>Join Rosarian Review Center</h2>
            <p>Access exclusive study materials, mock examinations, and expert guidance for your CLE preparation.</p>
            
            <div className="benefits-list">
              <div className="benefit-item">
                <span className="benefit-icon">📚</span>
                <span>TOS-based study materials</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🎯</span>
                <span>Weekly mock examinations</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">👨‍🏫</span>
                <span>Expert instructor guidance</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">💻</span>
                <span>Online and face-to-face sessions</span>
              </div>
            </div>

            <div className="contact-info">
              <h3>Need Help?</h3>
              <p>Contact us at 0926-024-5057</p>
              <p>Or visit us at Signal Village, Taguig</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;