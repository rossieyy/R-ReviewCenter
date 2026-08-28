import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>{`
        /* Footer Styles */
        .footer {
          background: linear-gradient(135deg, var(--primary-blue) 0%, #0f1419 100%);
          color: var(--white);
          margin-top: auto;
        }

        /* Footer Content */
        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
          padding: 4rem 0 2rem 0;
        }

        .footer-section h3 {
          color: var(--accent-gold);
          font-size: 1.3rem;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .footer-section {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .footer-section:nth-child(1) { animation-delay: 0.1s; }
        .footer-section:nth-child(2) { animation-delay: 0.2s; }
        .footer-section:nth-child(3) { animation-delay: 0.3s; }
        .footer-section:nth-child(4) { animation-delay: 0.4s; }

        /* Footer Logo */
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }

        .footer-logo:hover .logo-shield {
          transform: scale(1.05);
        }

        .logo-shield {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, var(--accent-gold) 0%, var(--dark-gold) 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-md);
          position: relative;
          transition: all 0.3s ease;
        }

        .logo-shield::before {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          right: 2px;
          bottom: 2px;
          background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%);
          border-radius: 6px;
        }

        .logo-text {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--white);
          position: relative;
          z-index: 1;
        }

        .footer-logo .logo-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .footer-logo .logo-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--white);
          line-height: 1.2;
        }

        .footer-logo .logo-tagline {
          font-size: 0.75rem;
          color: var(--accent-gold);
          font-weight: 400;
        }

        .footer-description {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        /* Social Links */
        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
          transition: all 0.3s ease;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .social-link:hover {
          background: var(--accent-gold);
          color: var(--white);
          transform: translateY(-2px);
        }

        /* Footer Links */
        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 0.75rem;
        }

        .footer-links a {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          padding: 0.25rem 0;
          display: block;
        }

        .footer-links a:hover {
          color: var(--accent-gold);
          padding-left: 0.5rem;
        }

        /* Contact Details */
        .footer-contact-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          transition: all 0.3s ease;
        }

        .contact-item:hover .contact-icon {
          color: var(--accent-gold);
          transform: scale(1.1);
        }

        .contact-icon {
          font-size: 1.2rem;
          margin-top: 0.1rem;
          min-width: 20px;
          transition: all 0.3s ease;
        }

        .footer-contact-info p {
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          line-height: 1.4;
          font-size: 0.95rem;
        }

        .footer-contact-info p:first-child {
          font-weight: 600;
        }

        /* Footer Promo */
        .footer-promo {
          background: linear-gradient(90deg, var(--accent-gold) 0%, var(--dark-gold) 100%);
          padding: 2rem 0;
          margin: 2rem 0 0 0;
        }

        .promo-content {
          text-align: center;
          color: var(--white);
        }

        .promo-content h3 {
          color: var(--white);
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .promo-content p {
          margin-bottom: 1.5rem;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .promo-cta {
          background: var(--white);
          color: var(--accent-gold);
          padding: 0.75rem 2rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          font-weight: 700;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-shadow: var(--shadow-md);
          display: inline-block;
        }

        .promo-cta:hover {
          background: var(--gray-100);
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        /* Footer Bottom */
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding: 2rem 0;
          margin-top: 2rem;
        }

        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-bottom p {
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          font-size: 0.9rem;
        }

        .footer-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .footer-tags span {
          background: rgba(255, 255, 255, 0.1);
          color: var(--accent-gold);
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: default;
        }

        .footer-tags span:hover {
          background: var(--accent-gold);
          color: var(--white);
          transform: translateY(-2px);
        }

        /* Animation Effects */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 3rem 0 1.5rem 0;
          }
          .footer-section { text-align: center; }
          .footer-logo { justify-content: center; }
          .social-links { justify-content: center; }
          .footer-bottom-content { flex-direction: column; text-align: center; }
          .footer-tags { justify-content: center; }
          .promo-content h3 { font-size: 1.2rem; }
          .promo-content p { font-size: 0.9rem; }
        }

        @media (max-width: 480px) {
          .footer-content { padding: 2rem 0 1rem 0; }
          .logo-shield { width: 40px; height: 40px; }
          .logo-text { font-size: 1rem; }
          .footer-logo .logo-name { font-size: 1rem; }
          .contact-item { flex-direction: column; align-items: center; text-align: center; }
          .promo-content { padding: 0 1rem; }
          .promo-content h3 { font-size: 1rem; line-height: 1.4; }
          .promo-cta { padding: 0.5rem 1.5rem; font-size: 0.9rem; }
          .footer-tags span { font-size: 0.7rem; padding: 0.2rem 0.5rem; }
        }
      `}</style>

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
              <div className="footer-contact-details">
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <div className="footer-contact-info">
                    <p>307 Col. Salazar St., Corner Col. Rongo</p>
                    <p>Central Signal Village, Taguig</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <div className="footer-contact-info">
                    <p>0926-024-5057</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">🕐</span>
                  <div className="footer-contact-info">
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
    </>
  );
};

export default Footer;
