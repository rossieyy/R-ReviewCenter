import React, { useEffect, useRef } from 'react';

const About: React.FC = () => {
  const valuesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animate'); }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    valuesRef.current?.querySelectorAll('.value-card').forEach(el => observer.observe(el));
    statsRef.current?.querySelectorAll('.stat-card').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ── About Page ── */
        .about { width: 100%; }

        /* ─────────────────────────────────────
           HERO
        ───────────────────────────────────── */
        .about-hero {
          background: linear-gradient(135deg, var(--primary-blue) 0%, #1d4ed8 60%, var(--secondary-blue) 100%);
          background-size: 300% 300%;
          animation: gradientShift 14s ease infinite;
          color: var(--white);
          padding: 3.5rem 0 4.5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .about-hero::before {
          content: '';
          position: absolute;
          bottom: -2px; left: 0; right: 0;
          height: 60px;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 60'%3E%3Cpath fill='%23ffffff' d='M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z'/%3E%3C/svg%3E") no-repeat bottom;
          background-size: cover;
          z-index: 2;
        }

        .about-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none;
        }

        .about-hero .hero-inner { position: relative; z-index: 1; }

        .about-hero h1 {
          color: var(--white);
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
          animation: fadeInDown 0.65s cubic-bezier(0.22,1,0.36,1) both 0.1s;
        }

        .hero-subtitle {
          font-size: 1.15rem;
          color: rgba(255,255,255,0.88);
          font-weight: 500;
          animation: fadeInUp 0.65s cubic-bezier(0.22,1,0.36,1) both 0.25s;
        }

        /* ─────────────────────────────────────
           ABOUT CONTENT
        ───────────────────────────────────── */
        .about-content {
          padding: 5rem 0;
          background-color: var(--white);
        }

        .about-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        /* text column */
        .about-text { animation: fadeInLeft 0.7s cubic-bezier(0.22,1,0.36,1) both 0.2s; }

        .about-text h2 {
          color: var(--primary-blue);
          font-size: 1.9rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
          margin-top: 2.25rem;
          position: relative;
          padding-left: 1rem;
        }

        .about-text h2::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, var(--accent-gold), var(--primary-blue));
          border-radius: 2px;
        }

        .about-text h2:first-of-type { margin-top: 0; }

        .about-text p {
          font-size: 1.05rem;
          line-height: 1.75;
          margin-bottom: 1.5rem;
          color: var(--text-light);
        }

        .benefits-list {
          list-style: none;
          padding: 0;
          margin-top: 0.75rem;
        }

        .benefits-list li {
          padding: 0.7rem 0 0.7rem 0;
          font-size: 0.97rem;
          color: var(--text-dark);
          border-bottom: 1px solid var(--gray-200);
          display: flex;
          align-items: center;
          gap: 0.6rem;
          transition: padding-left 0.25s ease, color 0.25s ease;
        }

        .benefits-list li:last-child { border-bottom: none; }

        .benefits-list li:hover {
          padding-left: 8px;
          color: var(--primary-blue);
        }

        .check-icon {
          color: var(--success);
          font-weight: 800;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        /* stat cards column */
        .about-stats {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          animation: fadeInRight 0.7s cubic-bezier(0.22,1,0.36,1) both 0.3s;
        }

        .stat-card {
          background: linear-gradient(135deg, var(--primary-blue) 0%, #1d4ed8 100%);
          color: var(--white);
          padding: 2rem;
          border-radius: var(--radius-lg);
          text-align: center;
          box-shadow: 0 8px 24px rgba(30,58,138,0.25);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          opacity: 0;
          transform: translateX(30px);
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: -50%; left: -60%;
          width: 40%; height: 200%;
          background: rgba(255,255,255,0.1);
          transform: skewX(-20deg);
          animation: shimmer 3s ease-in-out infinite;
        }

        .stat-card.animate {
          opacity: 1;
          transform: translateX(0);
          transition: opacity 0.55s cubic-bezier(0.22,1,0.36,1),
                      transform 0.55s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.3s ease;
        }

        .stat-card:nth-child(1) { transition-delay: 0.05s; }
        .stat-card:nth-child(2) { transition-delay: 0.15s; }
        .stat-card:nth-child(3) { transition-delay: 0.25s; }

        .stat-card:hover {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 16px 36px rgba(30,58,138,0.35);
        }

        .stat-number {
          font-size: 3rem;
          font-weight: 800;
          color: var(--light-gold);
          display: block;
          margin-bottom: 0.4rem;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.9);
          font-weight: 600;
        }

        /* ─────────────────────────────────────
           LOCATION
        ───────────────────────────────────── */
        .location-section {
          padding: 5rem 0;
          background-color: var(--gray-50);
        }

        .location-section h2 {
          color: var(--primary-blue);
          font-size: 2.4rem;
          font-weight: 800;
          text-align: center;
          margin-bottom: 3rem;
          animation: fadeInUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }

        .location-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        .location-info {
          animation: fadeInLeft 0.7s cubic-bezier(0.22,1,0.36,1) both 0.1s;
        }

        .location-info h3 {
          color: var(--primary-blue);
          font-size: 1.4rem;
          font-weight: 800;
          margin-bottom: 1.25rem;
        }

        .info-card {
          background: var(--white);
          padding: 1.4rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          margin-bottom: 1.25rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .info-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          border-radius: 2px 0 0 2px;
        }

        .info-card.blue::before  { background: var(--primary-blue); }
        .info-card.teal::before  { background: var(--secondary-blue); }
        .info-card.green::before { background: var(--success); }

        .info-card:hover {
          transform: translateX(4px);
          box-shadow: var(--shadow-lg);
        }

        .info-card p {
          color: var(--text-dark);
          font-size: 0.97rem;
          margin-bottom: 0.4rem;
        }

        .info-card p:first-of-type {
          color: var(--primary-blue);
          font-weight: 700;
          margin-bottom: 0.6rem;
        }

        .info-card h4 {
          color: var(--primary-blue);
          font-weight: 700;
          margin-bottom: 0.75rem;
        }

        /* map placeholder */
        .map-placeholder {
          display: flex;
          justify-content: center;
          align-items: center;
          animation: fadeInRight 0.7s cubic-bezier(0.22,1,0.36,1) both 0.2s;
        }

        .map-container {
          width: 100%;
          height: 320px;
          background: linear-gradient(135deg, var(--light-blue) 0%, var(--gray-100) 100%);
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: var(--text-light);
          font-size: 1.1rem;
          box-shadow: var(--shadow-md);
          border: 2px dashed var(--gray-300);
          gap: 0.5rem;
        }

        .map-container p:first-child {
          font-weight: 700;
          color: var(--primary-blue);
          font-size: 1.2rem;
          margin: 0;
        }

        .map-container p:last-child { margin: 0; }

        /* ─────────────────────────────────────
           VALUES
        ───────────────────────────────────── */
        .values-section {
          padding: 5rem 0;
          background: var(--white);
        }

        .values-section h2 {
          color: var(--primary-blue);
          font-size: 2.4rem;
          font-weight: 800;
          text-align: center;
          margin-bottom: 3rem;
          animation: fadeInUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.75rem;
        }

        .value-card {
          background: var(--white);
          padding: 2rem;
          border-radius: var(--radius-lg);
          text-align: center;
          box-shadow: var(--shadow-md);
          border-top: 4px solid var(--accent-gold);
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.55s cubic-bezier(0.22,1,0.36,1),
                      transform 0.55s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .value-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--primary-blue), var(--secondary-blue));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }

        .value-card:hover::after { transform: scaleX(1); }

        .value-card:nth-child(1) { transition-delay: 0.05s; }
        .value-card:nth-child(2) { transition-delay: 0.15s; }
        .value-card:nth-child(3) { transition-delay: 0.25s; }
        .value-card:nth-child(4) { transition-delay: 0.35s; }

        .value-card.animate {
          opacity: 1;
          transform: translateY(0);
        }

        .value-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 40px rgba(30,58,138,0.12);
        }

        .value-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          display: block;
        }

        .value-card h3 {
          color: var(--primary-blue);
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }

        .value-card p {
          color: var(--text-light);
          line-height: 1.65;
          font-size: 0.97rem;
        }

        /* ─────────────────────────────────────
           RESPONSIVE
        ───────────────────────────────────── */
        @media (max-width: 768px) {
          .about-hero h1 { font-size: 2.2rem; }
          .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .about-text { padding-right: 0; }
          .about-stats { flex-direction: row; flex-wrap: wrap; gap: 1rem; }
          .stat-card { flex: 1; min-width: 120px; }
          .stat-number { font-size: 2.2rem; }
          .location-grid { grid-template-columns: 1fr; gap: 2rem; }
          .values-grid { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
        }

        @media (max-width: 480px) {
          .about-hero { padding: 2.5rem 0 3.5rem; }
          .about-hero h1 { font-size: 1.8rem; }
          .hero-subtitle { font-size: 1rem; }
          .about-stats { flex-direction: column; }
          .values-grid { grid-template-columns: 1fr; }
          .value-card { padding: 1.5rem; }
        }
      `}</style>

      <div className="about">
        {/* ── HERO ── */}
        <section className="about-hero">
          <div className="container hero-inner">
            <h1>About Rosarian Review Center</h1>
            <p className="hero-subtitle">Achieving Excellence in Criminology Education</p>
          </div>
        </section>

        {/* ── ABOUT CONTENT ── */}
        <section className="about-content">
          <div className="container">
            <div className="about-grid">
              <div className="about-text">
                <h2>Our Mission</h2>
                <p>
                  Rosarian Review Center is dedicated to providing comprehensive and effective review
                  programs for aspiring criminologists taking the Licensure Examination for
                  Criminologists (CLE). We are committed to excellence in education and helping our
                  students achieve their dreams of becoming licensed criminologists.
                </p>

                <h2>Our Vision</h2>
                <p>
                  To be the leading review center in the Philippines, known for producing successful
                  criminology board passers through innovative teaching methods, comprehensive
                  materials, and dedicated faculty support.
                </p>

                <h2>Why Choose RRC?</h2>
                <ul className="benefits-list">
                  {[
                    'Experienced and qualified instructors',
                    'Comprehensive review materials based on the Table of Specifications (TOS)',
                    'Regular mock examinations and board simulations',
                    'Online and face-to-face learning options',
                    'Affordable review packages with valuable freebies',
                    'Strategic location in Taguig City',
                    'Proven track record of board exam success',
                  ].map((item, i) => (
                    <li key={i}>
                      <span className="check-icon">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="about-stats" ref={statsRef}>
                <div className="stat-card">
                  <span className="stat-number">95%</span>
                  <div className="stat-label">Pass Rate</div>
                </div>
                <div className="stat-card">
                  <span className="stat-number">500+</span>
                  <div className="stat-label">Successful Graduates</div>
                </div>
                <div className="stat-card">
                  <span className="stat-number">10+</span>
                  <div className="stat-label">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── LOCATION ── */}
        <section className="location-section">
          <div className="container">
            <h2>Our Location</h2>
            <div className="location-grid">
              <div className="location-info">
                <h3>ROSARIAN REVIEW CENTER</h3>
                <div className="info-card blue">
                  <p>Address</p>
                  <p>307 Col. Salazar St., Corner Col. Rongo</p>
                  <p>Central Signal Village (Signal Village), Taguig</p>
                </div>
                <div className="info-card teal">
                  <p>Contact</p>
                  <p>📞 0926-024-5057</p>
                  <p>💬 Facebook: Rosarian Review Center</p>
                </div>
                <div className="info-card green">
                  <h4>Operating Hours</h4>
                  <p>Monday to Friday: 8:00 AM – 6:00 PM</p>
                  <p>Saturday: 8:00 AM – 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
              <div className="map-placeholder">
                <div className="map-container">
                  <p>📍 Interactive Map</p>
                  <p>Signal Village, Taguig</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="values-section">
          <div className="container">
            <h2>Our Core Values</h2>
            <div className="values-grid" ref={valuesRef}>
              <div className="value-card">
                <span className="value-icon">🎯</span>
                <h3>Excellence</h3>
                <p>We strive for the highest standards in education and review preparation.</p>
              </div>
              <div className="value-card">
                <span className="value-icon">🤝</span>
                <h3>Integrity</h3>
                <p>We conduct our programs with honesty, transparency, and ethical practices.</p>
              </div>
              <div className="value-card">
                <span className="value-icon">💡</span>
                <h3>Innovation</h3>
                <p>We continuously improve our teaching methods and materials for better results.</p>
              </div>
              <div className="value-card">
                <span className="value-icon">❤️</span>
                <h3>Dedication</h3>
                <p>We are committed to our students' success and professional development.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
