import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../utils/hooks';
import { registrationRules, checkPasswordStrength } from '../utils/validation';
import { RegistrationForm } from '../types';
import '../styles/Auth.css';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const initialValues: RegistrationForm = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  };

  const handleRegistration = async (values: RegistrationForm) => {
    try {
      // Validate password confirmation
      if (values.password !== values.confirmPassword) {
        setFieldError('confirmPassword', 'Passwords do not match');
        return;
      }

      if (!values.agreeToTerms) {
        setFieldError('agreeToTerms', 'You must agree to the terms and conditions');
        return;
      }

      // TODO: Implement actual registration logic here
      console.log('Registration attempt:', { ...values, password: '***', confirmPassword: '***' });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Handle successful registration (redirect, show success message, etc.)
      alert('Registration successful! Please check your email for verification. (This is a demo)');
      navigate('/login');
      
    } catch (error) {
      console.error('Registration error:', error);
      setFieldError('general', 'Registration failed. Please try again.');
    }
  };

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFieldError
  } = useForm(initialValues, registrationRules, handleRegistration);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    handleChange(name as keyof RegistrationForm, type === 'checkbox' ? checked : value);
  };

  // Get password strength for display
  const passwordStrength = values.password ? checkPasswordStrength(values.password) : null;

  return (
    <div className="auth-page register-page">
      <div className="auth-container">
        <div className="auth-card register-card">
          <div className="auth-header">
            <div className="logo-section">
              <div className="auth-logo">RRC</div>
              <h1>Join RRC</h1>
              <p>Create your account for February 2027 CLE Review</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {errors.general && (
              <div className="error-banner">
                {errors.general}
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleInputChange}
                  className={`form-input ${errors.firstName ? 'error' : ''}`}
                  placeholder="Enter your first name"
                  disabled={isSubmitting}
                />
                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleInputChange}
                  className={`form-input ${errors.lastName ? 'error' : ''}`}
                  placeholder="Enter your last name"
                  disabled={isSubmitting}
                />
                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
              </div>
            </div>

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
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleInputChange}
                className={`form-input ${errors.phoneNumber ? 'error' : ''}`}
                placeholder="09XXXXXXXXX"
                disabled={isSubmitting}
              />
              {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
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
              {passwordStrength && (
                <div className="password-strength">
                  <div className={`strength-meter strength-${passwordStrength.score}`}>
                    <div className="strength-fill"></div>
                  </div>
                  <small className="strength-text">
                    {passwordStrength.feedback[0] || 'Password strength indicator'}
                  </small>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleInputChange}
                className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                placeholder="Confirm your password"
                disabled={isSubmitting}
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={values.agreeToTerms}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
                <span className="checkbox-text">
                  I agree to the <Link to="/terms" className="terms-link">Terms and Conditions</Link> and <Link to="/privacy" className="terms-link">Privacy Policy</Link>
                </span>
              </label>
              {errors.agreeToTerms && <span className="error-text">{errors.agreeToTerms}</span>}
            </div>

            <button 
              type="submit" 
              className={`auth-button ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login" className="auth-link">Sign in</Link></p>
          </div>
        </div>

        <div className="auth-info register-info">
          <div className="info-content">
            <h2>February 2027 CLE Review</h2>
            <p>Join hundreds of successful criminology graduates who trusted RRC for their board exam preparation.</p>
            
            <div className="promo-highlight">
              <h3>OPENING PROMO</h3>
              <div className="price-comparison">
                <div className="price-item">
                  <span className="old-price">₱13,000</span>
                  <span className="new-price">₱10,000</span>
                </div>
                <p>Only ₱1,000 down payment to secure your slot!</p>
              </div>
            </div>

            <div className="program-features">
              <h3>What's Included:</h3>
              <ul>
                <li>📚 FREE TOS-based books and materials</li>
                <li>🎯 Weekly mock board examinations</li>
                <li>💻 Online and face-to-face sessions</li>
                <li>👕 FREE review t-shirt and supplies</li>
                <li>🏆 Board exam simulation with rationalization</li>
              </ul>
            </div>

            <div className="contact-info">
              <h3>Questions?</h3>
              <p>📞 0926-024-5057</p>
              <p>📍 Signal Village, Taguig</p>
              <p>💬 Facebook: Rosarian Review Center</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;