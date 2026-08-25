import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScroll } from '../utils/hooks';
import '../styles/Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { scrollPosition } = useScroll();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePage = (path: string) => {
    return location.pathname === path;
  };

  // Add scroll effect to header
  useEffect(() => {
    const header = document.querySelector('.header');
    if (scrollPosition > 100) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, [scrollPosition]);

  // Close mobile menu when clicking outside or on route change
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [location.pathname]);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo" onClick={closeMenu}>
            <img
              src="/RRC.jpg"
              alt="Rosarian Review Center Logo"
              className="logo-image"
            />
            <div className="logo-info">
              <span className="logo-name">Rosarian Review Center</span>
              <span className="logo-tagline">Achieving Excellence</span>
            </div>
          </Link>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li>
                <Link 
                  to="/" 
                  className={`nav-link ${isActivePage('/') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className={`nav-link ${isActivePage('/about') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/topics" 
                  className={`nav-link ${isActivePage('/topics') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Topics
                </Link>
              </li>
              <li>
                <Link 
                  to="/articles" 
                  className={`nav-link ${isActivePage('/articles') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className={`nav-link ${isActivePage('/faq') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <div className="contact-info">
              <span className="phone">📞 0926-024-5057</span>
            </div>
            <div className="auth-buttons">
              <Link 
                to="/login" 
                className={`auth-btn login-btn ${isActivePage('/login') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className={`auth-btn register-btn ${isActivePage('/register') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Register
              </Link>
            </div>
          </div>

          <button 
            className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="mobile-overlay" onClick={closeMenu}></div>
      )}
    </header>
  );
};

export default Header;