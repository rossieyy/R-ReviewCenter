import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <div className="logo-shield">
                <span className="logo-text">RRC</span>
              </div>
              <div className="logo-info">
                <span className="logo-name">Rosarian Review Center</span>
                <span className="logo-tagline">Achieving Excellence</span>
              </div>
            </div>
            <p className="footer-description">
              Your trusted partner for February 2027 CLE preparation. 
              Join hundreds of successful criminology graduates who chose RRC for their board exam journey.
            </p>
            <div className="social-links">
              <a href="https://facebook.com/RosarianReviewCenter" target="_blank" rel="noopener noreferrer" className="social-link">
                📘 Facebook
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/topics">Review Topics</Link></li>
              <li><Link to="/articles">Articles</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Account</h3>
            <ul className="footer-links">
              <li><Link to="/register">Register Now</Link></li>
              <li><Link to="/login">Student Login</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Information</h3>
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div className="contact-info">
                  <p>307 Col. Salazar St., Corner Col. Rongo</p>
                  <p>Central Signal Village, Taguig</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div className="contact-info">
                  <p>0926-024-5057</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🕐</span>
                <div className="contact-info">
                  <p>Mon-Fri: 8AM-6PM</p>
                  <p>Saturday: 8AM-4PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-promo">
          <div className="promo-content">
            <h3>February 2027 CLE Registration Still Open!</h3>
            <p>
              <strong>Opening Promo:</strong> ₱10,000 (Regular: ₱13,000) | 
              <strong> Down Payment:</strong> Only ₱1,000
            </p>
            <Link to="/register" className="promo-cta">Register Now - Limited Slots!</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} Rosarian Review Center. All rights reserved.</p>
            <div className="footer-tags">
              <span>#RosarianReviewCenter</span>
              <span>#CLE2027</span>
              <span>#February2027CLE</span>
              <span>#CriminologyReview</span>
              <span>#RCrim</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;