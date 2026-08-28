import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../utils/hooks';
import { registrationRules, checkPasswordStrength } from '../utils/validation';
import { RegistrationForm } from '../types';

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
      if (values.password !== values.confirmPassword) {
        setFieldError('confirmPassword', 'Passwords do not match');
        return;
      }

      if (!values.agreeToTerms) {
        setFieldError('agreeToTerms', 'You must agree to the terms and conditions');
        return;
      }

      console.log('Registration attempt:', { ...values, password: '***', confirmPassword: '***' });
      await new Promise(resolve => setTimeout(resolve, 2000));
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

  const passwordStrength = values.password ? checkPasswordStrength(values.password) : null;

  return (
    <>
      <style>{`
        /* ── Register Page ── */
        .auth-page {
          min-height: calc(100vh - 80px);
          background: linear-gradient(135deg, var(--light-blue) 0%, #f0f4ff 50%, var(--light-blue) 100%);
          background-size: 400% 400%;
          animation: gradientShift 12s ease infinite;
          padding: 2.5rem 0;
          display: flex;
          align-items: center;
        }

        .auth-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        /* ── Card ── */
        .auth-card {
          background: var(--white);
          border-radius: var(--radius-xl);
          box-shadow: 0 25px 60px rgba(30, 58, 138, 0.15);
          padding: 3rem;
          width: 100%;
          max-width: 520px;
          margin: 0 auto;
          animation: fadeInLeft 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
          position: relative;
          overflow: hidden;
        }

        .auth-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-blue), var(--secondary-blue), var(--accent-gold));
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }

        /* ── Header ── */
        .auth-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .logo-section {
          margin-bottom: 1.5rem;
        }

        .auth-logo {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--accent-gold) 0%, var(--dark-gold) 100%);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--white);
          margin: 0 auto 1rem auto;
          box-shadow: 0 8px 24px rgba(217, 119, 6, 0.4);
          animation: bounceIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) both 0.2s;
          position: relative;
          overflow: hidden;
        }

        .auth-logo::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -60%;
          width: 40%;
          height: 200%;
          background: rgba(255,255,255,0.25);
          transform: skewX(-20deg);
          animation: shimmer 2.5s ease-in-out infinite;
        }

        .auth-header h1 {
          color: var(--primary-blue);
          font-size: 2rem;
          margin-bottom: 0.4rem;
          animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both 0.3s;
        }

        .auth-header p {
          color: var(--text-light);
          font-size: 0.95rem;
          animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both 0.4s;
        }

        /* ── Form ── */
        .auth-form {
          width: 100%;
        }

        .error-banner {
          background-color: rgba(239, 68, 68, 0.08);
          border: 1px solid var(--error);
          color: var(--error);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          text-align: center;
          animation: scaleIn 0.3s ease both;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          margin-bottom: 1.25rem;
          animation: fadeInUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .form-group:nth-child(1) { animation-delay: 0.45s; }
        .form-group:nth-child(2) { animation-delay: 0.5s; }
        .form-group:nth-child(3) { animation-delay: 0.55s; }
        .form-group:nth-child(4) { animation-delay: 0.6s; }
        .form-group:nth-child(5) { animation-delay: 0.65s; }
        .form-group:nth-child(6) { animation-delay: 0.7s; }
        .form-group:nth-child(7) { animation-delay: 0.75s; }

        .form-label {
          display: block;
          color: var(--text-dark);
          font-weight: 600;
          margin-bottom: 0.4rem;
          font-size: 0.875rem;
          letter-spacing: 0.02em;
        }

        .form-input {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 2px solid var(--gray-200);
          border-radius: var(--radius-md);
          font-size: 1rem;
          color: var(--text-dark);
          background-color: var(--white);
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease;
          box-sizing: border-box;
        }

        .form-input::placeholder {
          color: var(--gray-300);
        }

        .form-input:focus {
          outline: none;
          border-color: var(--primary-blue);
          box-shadow: 0 0 0 4px rgba(30, 58, 138, 0.1);
          transform: translateY(-1px);
        }

        .form-input.error {
          border-color: var(--error);
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        .form-input:disabled {
          background-color: var(--gray-100);
          cursor: not-allowed;
          opacity: 0.7;
        }

        .error-text {
          color: var(--error);
          font-size: 0.78rem;
          margin-top: 0.3rem;
          display: block;
          animation: fadeInDown 0.3s ease both;
        }

        /* ── Checkbox ── */
        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .checkbox-label input[type="checkbox"] {
          width: 18px;
          height: 18px;
          margin-top: 2px;
          accent-color: var(--primary-blue);
          flex-shrink: 0;
          cursor: pointer;
        }

        .checkbox-text {
          color: var(--text-dark);
          line-height: 1.4;
        }

        .terms-link {
          color: var(--primary-blue);
          text-decoration: none;
          font-weight: 600;
        }

        .terms-link:hover {
          color: var(--secondary-blue);
          text-decoration: underline;
        }

        /* ── Submit button ── */
        .auth-button {
          width: 100%;
          background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%);
          color: var(--white);
          border: none;
          padding: 1rem;
          font-size: 1rem;
          font-weight: 700;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease;
          box-shadow: 0 4px 15px rgba(30, 58, 138, 0.35);
          position: relative;
          overflow: hidden;
          letter-spacing: 0.03em;
          margin-top: 0.5rem;
        }

        .auth-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.1);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .auth-button:hover:not(:disabled)::before { opacity: 1; }

        .auth-button:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(30, 58, 138, 0.45);
        }

        .auth-button:active:not(:disabled) {
          transform: translateY(-1px);
        }

        .auth-button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          transform: none;
        }

        /* ── Footer ── */
        .auth-footer {
          text-align: center;
          margin-top: 1.75rem;
          padding-top: 1.75rem;
          border-top: 1px solid var(--gray-200);
          animation: fadeIn 0.6s ease both 0.8s;
        }

        .auth-footer p {
          color: var(--text-light);
          font-size: 0.9rem;
          margin-bottom: 0;
        }

        .auth-link {
          color: var(--primary-blue);
          text-decoration: none;
          font-weight: 700;
        }

        .auth-link:hover {
          color: var(--secondary-blue);
          text-decoration: underline;
        }

        /* ── Register-card width ── */
        .register-card {
          max-width: 560px;
        }

        /* ── Info panel ── */
        .register-info {
          background: linear-gradient(135deg, var(--primary-blue) 0%, #1d4ed8 60%, var(--secondary-blue) 100%);
          color: var(--white);
          padding: 3rem;
          border-radius: var(--radius-xl);
          box-shadow: 0 25px 60px rgba(30, 58, 138, 0.3);
          animation: fadeInRight 0.7s cubic-bezier(0.22, 1, 0.36, 1) both 0.15s;
          position: relative;
          overflow: hidden;
        }

        /* decorative blobs */
        .register-info::before,
        .register-info::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          opacity: 0.12;
          pointer-events: none;
        }
        .register-info::before {
          width: 280px; height: 280px;
          background: var(--white);
          top: -80px; right: -80px;
          animation: float 7s ease-in-out infinite;
        }
        .register-info::after {
          width: 180px; height: 180px;
          background: var(--accent-gold);
          bottom: -50px; left: -50px;
          animation: float 9s ease-in-out infinite reverse;
        }

        .info-content {
          position: relative;
          z-index: 1;
        }

        .register-info h2 {
          color: var(--white);
          font-size: 2rem;
          margin-bottom: 0.75rem;
          animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both 0.3s;
        }

        .register-info > .info-content > p,
        .register-info p {
          color: rgba(255, 255, 255, 0.92);
          font-size: 1.05rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        /* ── Promo highlight inside info panel ── */
        .promo-highlight {
          background: rgba(255, 255, 255, 0.12);
          padding: 1.75rem;
          border-radius: var(--radius-lg);
          margin: 1.5rem 0;
          border: 1px solid rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(6px);
          animation: scaleIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both 0.45s;
        }

        .promo-highlight h3 {
          color: var(--light-gold);
          font-size: 1.3rem;
          margin-bottom: 1rem;
          text-align: center;
          letter-spacing: 0.05em;
        }

        .price-comparison {
          text-align: center;
        }

        .price-comparison .price-item {
          margin-bottom: 0.75rem;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
        }

        .old-price {
          text-decoration: line-through;
          color: rgba(255, 255, 255, 0.55);
          font-size: 1.2rem;
        }

        .new-price {
          color: var(--white);
          font-size: 2.2rem;
          font-weight: 800;
          text-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .price-comparison p {
          color: var(--light-gold);
          font-weight: 600;
          font-size: 0.95rem;
          margin-top: 0.5rem;
        }

        /* ── Program features ── */
        .program-features {
          margin: 1.75rem 0;
          animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both 0.6s;
        }

        .program-features h3 {
          color: var(--light-gold);
          margin-bottom: 0.75rem;
          font-size: 1.1rem;
          letter-spacing: 0.03em;
        }

        .program-features ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .program-features li {
          padding: 0.55rem 0;
          color: rgba(255, 255, 255, 0.92);
          font-size: 0.95rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: padding-left 0.25s ease, color 0.25s ease;
        }

        .program-features li:last-child {
          border-bottom: none;
        }

        .program-features li:hover {
          padding-left: 6px;
          color: var(--white);
        }

        /* ── Contact inside info panel ── */
        .register-contact {
          margin-top: 1.75rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both 0.75s;
        }

        .register-contact h3 {
          color: var(--light-gold);
          margin-bottom: 0.75rem;
          font-size: 1.1rem;
        }

        .register-contact p {
          color: rgba(255, 255, 255, 0.88);
          font-weight: 500;
          margin-bottom: 0.4rem;
          font-size: 0.95rem;
        }

        /* ── Password strength ── */
        .password-strength {
          margin-top: 0.5rem;
        }

        .strength-meter {
          width: 100%;
          height: 5px;
          background-color: var(--gray-200);
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 0.3rem;
        }

        .strength-fill {
          height: 100%;
          width: 0;
          border-radius: 3px;
          transition: width 0.4s ease, background-color 0.4s ease;
        }

        .strength-meter.strength-1 .strength-fill { width: 20%; background-color: var(--error); }
        .strength-meter.strength-2 .strength-fill { width: 40%; background-color: #f97316; }
        .strength-meter.strength-3 .strength-fill { width: 60%; background-color: var(--warning); }
        .strength-meter.strength-4 .strength-fill { width: 80%; background-color: #84cc16; }
        .strength-meter.strength-5 .strength-fill { width: 100%; background-color: var(--success); }

        .strength-text {
          color: var(--text-light);
          font-size: 0.78rem;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .auth-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .register-info {
            order: -1;
            padding: 2rem;
          }
          .register-info h2 { font-size: 1.6rem; }
          .auth-card { padding: 2rem; }
          .register-card { max-width: none; }
        }

        @media (max-width: 600px) {
          .auth-page { padding: 1.25rem 0; }
          .form-row { grid-template-columns: 1fr; }
          .auth-card { padding: 1.5rem; }
          .auth-logo { width: 64px; height: 64px; font-size: 1.4rem; }
          .auth-header h1 { font-size: 1.6rem; }
          .register-info { padding: 1.5rem; }
          .promo-highlight { padding: 1.25rem; }
          .new-price { font-size: 1.8rem; }
        }
      `}</style>

      <div className="auth-page register-page">
        <div className="auth-container">
          <div className="auth-card register-card">
            <div className="auth-header">
              <div className="logo-section">
                <div className="auth-logo">RRC</div>
                <h1>Join RRC</h1>
                <p>Create your account for <strong>February 2027 CLE Review</strong></p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {errors.general && (
                <div className="error-banner">{errors.general}</div>
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
                    I agree to the{' '}
                    <Link to="/terms" className="terms-link">Terms and Conditions</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="terms-link">Privacy Policy</Link>
                  </span>
                </label>
                {errors.agreeToTerms && <span className="error-text">{errors.agreeToTerms}</span>}
              </div>

              <button
                type="submit"
                className="auth-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="auth-footer">
              <p>Already have an account? <Link to="/login" className="auth-link">Sign in</Link></p>
            </div>
          </div>

          <div className="register-info">
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

              <div className="register-contact">
                <h3>Questions?</h3>
                <p>📞 0926-024-5057</p>
                <p>📍 Signal Village, Taguig</p>
                <p>💬 Facebook: Rosarian Review Center</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
