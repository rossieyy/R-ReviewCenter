import React, { useEffect, useRef } from 'react';

const Home: React.FC = () => {
  const freebiesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const items = freebiesRef.current?.querySelectorAll('.freebie-item, .section-reveal');
    items?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ── Home Page ── */
        .home { width: 100%; }

        /* ─────────────────────────────────────
           HERO
        ───────────────────────────────────── */
        .hero-section {
          background: linear-gradient(135deg, var(--primary-blue) 0%, #1d4ed8 50%, var(--accent-black) 100%);
          background-size: 300% 300%;
          animation: gradientShift 14s ease infinite;
          color: var(--white);
          padding: 5.5rem 0 6rem;
          position: relative;
          overflow: hidden;
        }

        /* animated wave overlay */
        .hero-section::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0; right: 0;
          height: 80px;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 80'%3E%3Cpath fill='%23f9fafb' d='M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z'/%3E%3C/svg%3E") no-repeat bottom;
          background-size: cover;
          z-index: 2;
        }

        /* particle dots */
        .hero-section::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: fadeIn 1.5s ease both;
          pointer-events: none;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 3rem;
          align-items: center;
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* ── Hero text ── */
        .hero-text { max-width: 600px; }

        .hero-eyebrow {
          display: inline-block;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.3);
          color: var(--light-gold);
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.35rem 0.9rem;
          border-radius: 20px;
          margin-bottom: 1rem;
          animation: fadeInDown 0.6s cubic-bezier(0.22,1,0.36,1) both 0.2s;
        }

        .hero-text h1 {
          color: var(--white);
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          line-height: 1.15;
          text-shadow: 0 2px 12px rgba(0,0,0,0.25);
          animation: fadeInLeft 0.7s cubic-bezier(0.22,1,0.36,1) both 0.35s;
        }

        .hero-text h2 {
          color: rgba(255,255,255,0.9);
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 1.25rem;
          animation: fadeInLeft 0.7s cubic-bezier(0.22,1,0.36,1) both 0.45s;
        }

        .hero-description {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.85);
          margin-bottom: 2rem;
          line-height: 1.7;
          animation: fadeInLeft 0.7s cubic-bezier(0.22,1,0.36,1) both 0.55s;
        }

        /* ── Promo card ── */
        .promo-highlight {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(12px);
          border-radius: var(--radius-lg);
          padding: 1.75rem;
          margin-bottom: 2rem;
          border: 1px solid rgba(255,255,255,0.22);
          animation: scaleIn 0.65s cubic-bezier(0.22,1,0.36,1) both 0.65s;
          position: relative;
          overflow: hidden;
        }

        .promo-highlight::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--accent-gold), var(--light-gold), var(--accent-gold));
          background-size: 200% auto;
          animation: shimmer 2.5s linear infinite;
        }

        .promo-highlight h3 {
          color: var(--light-gold);
          font-size: 1.5rem;
          margin-bottom: 1rem;
          text-align: center;
          letter-spacing: 0.07em;
          font-weight: 800;
        }

        .pricing { display: flex; flex-direction: column; gap: 0.6rem; }

        .price-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.4rem 0;
        }

        .label {
          font-weight: 600;
          color: rgba(255,255,255,0.88);
          font-size: 0.95rem;
        }

        .regular-price {
          text-decoration: line-through;
          color: rgba(255,255,255,0.5);
          font-size: 1.15rem;
        }

        .promo-price {
          color: var(--white);
          font-size: 1.8rem;
          font-weight: 800;
          text-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .down-payment {
          text-align: center;
          padding: 0.85rem;
          background: rgba(217,119,6,0.25);
          border-radius: var(--radius-md);
          border: 1px solid rgba(217,119,6,0.4);
          margin-top: 0.75rem;
        }

        .highlight {
          font-size: 1rem;
          font-weight: 700;
          color: var(--light-gold);
        }

        /* ── CTA button ── */
        .cta-button {
          background: linear-gradient(135deg, var(--accent-gold) 0%, var(--dark-gold) 100%);
          color: var(--white);
          border: none;
          padding: 1rem 2.5rem;
          font-size: 1.05rem;
          font-weight: 800;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 6px 20px rgba(217,119,6,0.45);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          position: relative;
          overflow: hidden;
          animation: fadeInUp 0.6s cubic-bezier(0.22,1,0.36,1) both 0.8s;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.12);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .cta-button:hover::before { opacity: 1; }

        .cta-button:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 12px 30px rgba(217,119,6,0.5);
        }

        .cta-button:active { transform: translateY(-1px) scale(1); }

        /* ── Hero logo/shield ── */
        .hero-image {
          display: flex;
          justify-content: center;
          align-items: center;
          animation: fadeInRight 0.8s cubic-bezier(0.22,1,0.36,1) both 0.4s;
        }

        .logo-placeholder {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        /* ripple ring behind logo */
        .logo-placeholder::before,
        .logo-placeholder::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.2);
          animation: ripple 3s ease-out infinite;
        }
        .logo-placeholder::after { animation-delay: 1.5s; }

        .shield-logo {
          width: 220px;
          height: 220px;
          background: linear-gradient(135deg, var(--accent-black) 0%, #374151 100%);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          font-weight: 800;
          color: var(--white);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 4px rgba(255,255,255,0.15);
          position: relative;
          overflow: hidden;
          animation: float 4s ease-in-out infinite;
          z-index: 1;
        }

        .shield-logo::before {
          content: '';
          position: absolute;
          top: 0; left: -60%;
          width: 40%; height: 100%;
          background: rgba(255,255,255,0.15);
          transform: skewX(-20deg);
          animation: shimmer 3s ease-in-out infinite;
        }

        /* ─────────────────────────────────────
           FREEBIES
        ───────────────────────────────────── */
        .freebies-section {
          padding: 5rem 0;
          background-color: var(--gray-50);
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-tag {
          display: inline-block;
          background: var(--light-blue);
          color: var(--primary-blue);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.3rem 0.85rem;
          border-radius: 20px;
          margin-bottom: 0.75rem;
        }

        .freebies-section .section-header h2 {
          text-align: center;
          font-size: 2.4rem;
          color: var(--primary-blue);
          margin-bottom: 0.5rem;
        }

        .section-subtitle {
          color: var(--text-light);
          font-size: 1.05rem;
          max-width: 520px;
          margin: 0 auto;
        }

        .freebies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.25rem;
        }

        /* scroll-reveal base state */
        .freebie-item {
          background: var(--white);
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          font-weight: 600;
          color: var(--primary-blue);
          border-left: 4px solid var(--accent-gold);
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.55s cubic-bezier(0.22,1,0.36,1),
                      transform 0.55s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.3s ease;
        }

        .freebie-item:nth-child(1)  { transition-delay: 0.05s; }
        .freebie-item:nth-child(2)  { transition-delay: 0.10s; }
        .freebie-item:nth-child(3)  { transition-delay: 0.15s; }
        .freebie-item:nth-child(4)  { transition-delay: 0.20s; }
        .freebie-item:nth-child(5)  { transition-delay: 0.25s; }
        .freebie-item:nth-child(6)  { transition-delay: 0.30s; }
        .freebie-item:nth-child(7)  { transition-delay: 0.35s; }
        .freebie-item:nth-child(8)  { transition-delay: 0.40s; }
        .freebie-item:nth-child(9)  { transition-delay: 0.45s; }
        .freebie-item:nth-child(10) { transition-delay: 0.50s; }

        .freebie-item.animate {
          opacity: 1;
          transform: translateY(0);
        }

        .freebie-item:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 12px 30px rgba(30,58,138,0.12);
        }

        /* ─────────────────────────────────────
           SCHEDULE
        ───────────────────────────────────── */
        .review-schedule {
          padding: 5rem 0;
          background: linear-gradient(135deg, var(--primary-blue) 0%, #1d4ed8 100%);
          color: var(--white);
          position: relative;
          overflow: hidden;
        }

        .review-schedule::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none;
        }

        .review-schedule .section-header h2 {
          color: var(--white);
          text-align: center;
          font-size: 2.4rem;
          margin-bottom: 0.5rem;
        }

        .review-schedule .section-tag {
          background: rgba(255,255,255,0.15);
          color: var(--light-gold);
          border: 1px solid rgba(255,255,255,0.2);
        }

        .review-schedule .section-subtitle {
          color: rgba(255,255,255,0.8);
        }

        .schedule-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          max-width: 700px;
          margin: 0 auto 2rem;
        }

        .schedule-card {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border-radius: var(--radius-lg);
          padding: 2rem;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.2);
          transition: transform 0.3s ease, background 0.3s ease;
          animation: scaleIn 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }

        .schedule-card:nth-child(1) { animation-delay: 0.1s; }
        .schedule-card:nth-child(2) { animation-delay: 0.25s; }

        .schedule-card:hover {
          transform: translateY(-6px);
          background: rgba(255,255,255,0.16);
        }

        .schedule-card .day-count {
          font-size: 3rem;
          font-weight: 800;
          color: var(--light-gold);
          display: block;
          line-height: 1;
          margin-bottom: 0.4rem;
        }

        .schedule-card .day-type {
          font-size: 1rem;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 0.3rem;
        }

        .schedule-card .day-desc {
          font-size: 0.88rem;
          color: rgba(255,255,255,0.75);
        }

        .schedule-highlight {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border-radius: var(--radius-lg);
          padding: 2rem;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.2);
          max-width: 700px;
          margin: 0 auto;
          animation: fadeInUp 0.6s cubic-bezier(0.22,1,0.36,1) both 0.35s;
        }

        .schedule-highlight p {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.88);
          line-height: 1.6;
          margin: 0;
        }

        /* ─────────────────────────────────────
           CALL TO ACTION
        ───────────────────────────────────── */
        .call-to-action {
          padding: 5rem 0;
          background-color: var(--white);
          text-align: center;
          position: relative;
        }

        .call-to-action::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-blue), var(--secondary-blue), var(--accent-gold));
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }

        .call-to-action h2 {
          font-size: 2.5rem;
          color: var(--primary-blue);
          margin-bottom: 1rem;
          animation: fadeInUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }

        .call-to-action p {
          font-size: 1.1rem;
          color: var(--text-light);
          margin-bottom: 0.75rem;
          max-width: 560px;
          margin-left: auto;
          margin-right: auto;
          animation: fadeInUp 0.6s cubic-bezier(0.22,1,0.36,1) both 0.1s;
        }

        .motivation {
          font-size: 1.2rem;
          color: var(--accent-black);
          font-weight: 700;
          margin-bottom: 2rem;
          animation: fadeInUp 0.6s cubic-bezier(0.22,1,0.36,1) both 0.2s;
        }

        .register-button {
          background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%);
          color: var(--white);
          border: none;
          padding: 1.15rem 3rem;
          font-size: 1.1rem;
          font-weight: 800;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 6px 20px rgba(30,58,138,0.35);
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin-bottom: 1.25rem;
          position: relative;
          overflow: hidden;
          animation: scaleIn 0.65s cubic-bezier(0.22,1,0.36,1) both 0.3s;
        }

        .register-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.1);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .register-button:hover::before { opacity: 1; }

        .register-button:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 12px 30px rgba(30,58,138,0.45);
        }

        .register-button:active { transform: translateY(-1px) scale(1); }

        .limited-slots {
          display: inline-block;
          font-size: 0.92rem;
          color: var(--error);
          font-weight: 700;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.25);
          padding: 0.4rem 1rem;
          border-radius: 20px;
          animation: pulseSoft 2.2s ease-in-out infinite;
        }

        /* ─────────────────────────────────────
           RESPONSIVE
        ───────────────────────────────────── */
        @media (max-width: 768px) {
          .hero-content { grid-template-columns: 1fr; gap: 2rem; text-align: center; }
          .hero-text { max-width: 100%; }
          .hero-text h1 { font-size: 2.1rem; }
          .hero-text h2 { font-size: 1.2rem; }
          .hero-image { order: -1; }
          .shield-logo { width: 160px; height: 160px; font-size: 2.2rem; }
          .schedule-cards { grid-template-columns: 1fr; max-width: 340px; }
          .freebies-grid { grid-template-columns: 1fr; }
          .promo-highlight { padding: 1.5rem; }
          .freebies-section .section-header h2,
          .review-schedule .section-header h2,
          .call-to-action h2 { font-size: 2rem; }
        }

        @media (max-width: 480px) {
          .hero-section { padding: 3rem 0 4rem; }
          .hero-text h1 { font-size: 1.6rem; }
          .shield-logo { width: 130px; height: 130px; font-size: 1.8rem; }
          .cta-button, .register-button { padding: 0.9rem 1.75rem; font-size: 0.95rem; }
        }
      `}</style>

      <div className="home">
        {/* ── HERO ── */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <span className="hero-eyebrow">February 2027 CLE Takers</span>
              <h1>STILL ACCEPTING REGISTRATIONS</h1>
              <h2>Rosarian Review Center</h2>
              <p className="hero-description">
                Planning to take the February 2027 Licensure Examination for Criminologists (CLE)?
                Your review journey starts here — with expert guidance, complete materials, and a
                proven track record.
              </p>
              <div className="promo-highlight">
                <h3>⭐ OPENING PROMO</h3>
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
              <button className="cta-button">Register Now →</button>
            </div>

            <div className="hero-image">
              <div className="logo-placeholder">
                <div className="shield-logo">RRC</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FREEBIES ── */}
        <section className="freebies-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Included in Your Fee</span>
              <h2>Valuable Freebies Await You</h2>
              <p className="section-subtitle">Everything you need to pass — no extra purchases required.</p>
            </div>
            <div className="freebies-grid" ref={freebiesRef}>
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

        {/* ── SCHEDULE ── */}
        <section className="review-schedule">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">How We Review</span>
              <h2>Review Schedule</h2>
              <p className="section-subtitle">A flexible hybrid format built for working students.</p>
            </div>
            <div className="schedule-cards">
              <div className="schedule-card">
                <span className="day-count">3</span>
                <div className="day-type">Online Sessions</div>
                <div className="day-desc">Live interactive classes — attend from anywhere</div>
              </div>
              <div className="schedule-card">
                <span className="day-count">3</span>
                <div className="day-type">Face-to-Face Sessions</div>
                <div className="day-desc">In-person coaching every week at our center</div>
              </div>
            </div>
            <div className="schedule-highlight">
              <p>
                We are committed to providing you with the materials, practice, and guidance you need
                as you prepare for the February 2027 CLE.
              </p>
            </div>
          </div>
        </section>

        {/* ── CALL TO ACTION ── */}
        <section className="call-to-action">
          <div className="container">
            <h2>REGISTRATION IS STILL ONGOING</h2>
            <p>If you have been waiting for the right time to start your review, this is your time to begin.</p>
            <p className="motivation">Take the first step toward becoming a Registered Criminologist.</p>
            <br />
            <button className="register-button">Register Now →</button>
            <br />
            <span className="limited-slots">⚠️ Limited slots available. Register now.</span>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
