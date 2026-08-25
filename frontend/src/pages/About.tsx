import React from 'react';
import '../styles/About.css';

const About: React.FC = () => {
  return (
    <div className="about">
      <section className="about-hero">
        <div className="container">
          <h1>About Rosarian Review Center</h1>
          <p className="hero-subtitle">Achieving Excellence in Criminology Education</p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2>Our Mission</h2>
              <p>
                Rosarian Review Center is dedicated to providing comprehensive and effective review programs 
                for aspiring criminologists taking the Licensure Examination for Criminologists (CLE). 
                We are committed to excellence in education and helping our students achieve their dreams 
                of becoming licensed criminologists.
              </p>
              
              <h2>Our Vision</h2>
              <p>
                To be the leading review center in the Philippines, known for producing successful 
                criminology board passers through innovative teaching methods, comprehensive materials, 
                and dedicated faculty support.
              </p>

              <h2>Why Choose RRC?</h2>
              <ul className="benefits-list">
                <li>✓ Experienced and qualified instructors</li>
                <li>✓ Comprehensive review materials based on the Table of Specifications (TOS)</li>
                <li>✓ Regular mock examinations and board simulations</li>
                <li>✓ Online and face-to-face learning options</li>
                <li>✓ Affordable review packages with valuable freebies</li>
                <li>✓ Strategic location in Taguig City</li>
                <li>✓ Proven track record of board exam success</li>
              </ul>
            </div>
            
            <div className="about-stats">
              <div className="stat-card">
                <div className="stat-number">95%</div>
                <div className="stat-label">Pass Rate</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">500+</div>
                <div className="stat-label">Successful Graduates</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">10+</div>
                <div className="stat-label">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="location-section">
        <div className="container">
          <h2>Our Location</h2>
          <div className="location-grid">
            <div className="location-info">
              <h3>ROSARIAN REVIEW CENTER</h3>
              <div className="address">
                <p><strong>Address:</strong></p>
                <p>307 Col. Salazar St., Corner Col. Rongo</p>
                <p>Central Signal Village (Signal Village), Taguig</p>
              </div>
              
              <div className="contact-details">
                <p><strong>Contact Number:</strong> 0926-024-5057</p>
                <p><strong>Facebook Page:</strong> Rosarian Review Center</p>
              </div>
              
              <div className="operating-hours">
                <h4>Operating Hours</h4>
                <p>Monday to Friday: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 8:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
            
            <div className="map-placeholder">
              <div className="map-container">
                <p>Interactive Map</p>
                <p>Signal Village, Taguig</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Excellence</h3>
              <p>We strive for the highest standards in education and review preparation.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Integrity</h3>
              <p>We conduct our programs with honesty, transparency, and ethical practices.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Innovation</h3>
              <p>We continuously improve our teaching methods and materials for better results.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3>Dedication</h3>
              <p>We are committed to our students' success and professional development.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;