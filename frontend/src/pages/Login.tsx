import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../utils/hooks';
import { loginRules } from '../utils/validation';
import { LoginForm } from '../types';

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
    <>
      <style>{`
        /* ── Login Page ── */
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
          max-width: 500px;
          margin: 0 auto;
          animation: fadeInLeft 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
          position: relative;
          overflow: hidden;
        }

        .auth-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
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

        .logo-section { margin-bottom: 1.5rem; }

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
          top: -50%; left: -60%;
          width: 40%; height: 200%;
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
        .auth-form { width: 100%; }

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

        .form-group {
          margin-bottom: 1.4rem;
          animation: fadeInUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .form-group:nth-child(1) { animation-delay: 0.45s; }
        .form-group:nth-child(2) { animation-delay: 0.55s; }

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

        .form-input::placeholder { color: var(--gray-300); }

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

        /* ── Form options row ── */
        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.75rem;
          animation: fadeInUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both 0.65s;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .checkbox-label input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: var(--primary-blue);
          cursor: pointer;
        }

        .checkbox-text { color: var(--text-dark); }

        .forgot-link {
          color: var(--primary-blue);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: color 0.2s ease;
        }

        .forgot-link:hover {
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
          animation: fadeInUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both 0.75s;
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

        .auth-button:active:not(:disabled) { transform: translateY(-1px); }

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
          animation: fadeIn 0.6s ease both 0.9s;
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

        /* ── Info panel ── */
        .auth-info {
          background: linear-gradient(135deg, var(--primary-blue) 0%, #1d4ed8 60%, var(--secondary-blue) 100%);
          color: var(--white);
          padding: 3rem;
          border-radius: var(--radius-xl);
          box-shadow: 0 25px 60px rgba(30, 58, 138, 0.3);
          animation: fadeInRight 0.7s cubic-bezier(0.22, 1, 0.36, 1) both 0.15s;
          position: relative;
          overflow: hidden;
        }

        .auth-info::before, .auth-info::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
          pointer-events: none;
        }
        .auth-info::before {
          width: 260px; height: 260px;
          background: var(--white);
          top: -70px; right: -70px;
          animation: float 7s ease-in-out infinite;
        }
        .auth-info::after {
          width: 160px; height: 160px;
          background: var(--accent-gold);
          bottom: -50px; left: -50px;
          animation: float 9s ease-in-out infinite reverse;
        }

        .info-content { position: relative; z-index: 1; }

        .info-content h2 {
          color: var(--white);
          font-size: 2rem;
          margin-bottom: 0.75rem;
          animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both 0.3s;
        }

        .info-content > p {
          color: rgba(255, 255, 255, 0.92);
          font-size: 1.05rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both 0.4s;
        }

        /* ── Benefits list ── */
        .benefits-list {
          margin: 1.5rem 0;
          animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both 0.5s;
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.85rem;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.92);
          font-size: 0.95rem;
          transition: background 0.25s ease, transform 0.25s ease;
        }

        .benefit-item:hover {
          background: rgba(255, 255, 255, 0.18);
          transform: translateX(4px);
        }

        .benefit-icon { font-size: 1.4rem; flex-shrink: 0; }

        /* ── Contact in info panel ── */
        .contact-info {
          margin-top: 1.75rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both 0.65s;
        }

        .contact-info h3 {
          color: var(--light-gold);
          margin-bottom: 0.75rem;
          font-size: 1.1rem;
        }

        .contact-info p {
          color: rgba(255, 255, 255, 0.88);
          font-weight: 500;
          margin-bottom: 0.4rem;
          font-size: 0.95rem;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .auth-container { grid-template-columns: 1fr; gap: 2rem; }
          .auth-info { order: -1; padding: 2rem; }
          .info-content h2 { font-size: 1.6rem; }
          .auth-card { padding: 2rem; }
        }

        @media (max-width: 600px) {
          .auth-page { padding: 1.25rem 0; }
          .auth-card { padding: 1.5rem; }
          .auth-logo { width: 64px; height: 64px; font-size: 1.4rem; }
          .auth-header h1 { font-size: 1.6rem; }
          .form-options { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
          .auth-info { padding: 1.5rem; }
        }
      `}</style>

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
                <p>📞 Contact us at 0926-024-5057</p>
                <p>📍 Or visit us at Signal Village, Taguig</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
