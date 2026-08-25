import React from 'react';
import '../styles/Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>FEBRUARY 2027 CLE TAKERS</h1>
            <h2>WE ARE STILL ACCEPTING REGISTRATIONS</h2>
            <p className="hero-description">
              Planning to take the February 2027 Licensure Examination for Criminologists (CLE)?
              Your review journey can still start with Rosarian Review Center.
            </p>
            <div className="promo-highlight">
              <h3>OPENING PROMO</h3>
              <div className="pricing">
                <div className="price-item">
                  <span className="label">Regular Fee:</span>
                  <span className="regular-price">₱13,000</span>
                </div>
                <div className="price-item">
                  <span className="label">Promo Fee:</span>
                  <span className="promo-price">₱10,000</span>
                </div>
                <div className="down-payment">
                  <span className="highlight">Secure your slot with only ₱1,000 down payment</span>
                </div>
              </div>
            </div>
            <button className="cta-button">Register Now</button>
          </div>
          <div className="hero-image">
            <div className="logo-placeholder">
              <div className="shield-logo">RRC</div>
            </div>
          </div>
        </div>
      </section>

      <section className="freebies-section">
        <div className="container">
          <h2>Your review fee already comes with valuable FREEBIES</h2>
          <div className="freebies-grid">
            <div className="freebie-item">📚 FREE Review T-Shirt</div>
            <div className="freebie-item">📝 FREE Test Papers</div>
            <div className="freebie-item">📄 FREE Answer Sheets</div>
            <div className="freebie-item">🎯 FREE Weekly Mock Board Examinations</div>
            <div className="freebie-item">🏆 FREE Board Examination Simulation and Rationalization</div>
            <div className="freebie-item">📖 FREE TOS-Based Books</div>
            <div className="freebie-item">📓 FREE Logbook and Ballpen</div>
            <div className="freebie-item">💻 FREE Online Review</div>
            <div className="freebie-item">👨‍🏫 FREE Face-to-Face Final Coaching</div>
            <div className="freebie-item">⚡ FREE Quick Refresh Sessions</div>
          </div>
        </div>
      </section>

      <section className="review-schedule">
        <div className="container">
          <h2>Review Schedule</h2>
          <div className="schedule-highlight">
            <h3>3 DAYS ONLINE REVIEW + 3 DAYS FACE-to-FACE REVIEW EVERY WEEK</h3>
            <p>We are committed to providing you with the materials, practice, and guidance you need as you prepare for the February 2027 CLE.</p>
          </div>
        </div>
      </section>

      <section className="call-to-action">
        <div className="container">
          <h2>REGISTRATION IS STILL ONGOING</h2>
          <p>If you have been waiting for the right time to start your review, this is your time to begin.</p>
          <p className="motivation">Take the first step toward becoming a Registered Criminologist.</p>
          <button className="register-button">Register Now</button>
          <p className="limited-slots">Limited slots available. Register now.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;