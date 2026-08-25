import React, { useEffect, useRef } from 'react';

const Topics: React.FC = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);

  const topics = [
    { id: '1', title: 'Criminal Law and Jurisprudence',          description: 'Comprehensive coverage of criminal law principles, jurisprudence, and case studies relevant to the CLE examination.',                                        duration: '40 hours', materials: ['TOS-based modules', 'Case studies', 'Practice questions'],         difficulty: 'Advanced' as const },
    { id: '2', title: 'Law Enforcement Administration',          description: 'Organizational structure, management principles, and administrative procedures in law enforcement agencies.',                                                    duration: '35 hours', materials: ['Administrative manuals', 'Case scenarios', 'Mock examinations'],     difficulty: 'Intermediate' as const },
    { id: '3', title: 'Criminalistics',                          description: 'Scientific investigation techniques, forensic science principles, and evidence analysis methods.',                                                               duration: '30 hours', materials: ['Laboratory exercises', 'Forensic case studies', 'Technical manuals'], difficulty: 'Advanced' as const },
    { id: '4', title: 'Criminal Investigation and Detection',    description: 'Investigation procedures, detection techniques, and case-solving methodologies.',                                                                                duration: '35 hours', materials: ['Investigation protocols', 'Case studies', 'Practical exercises'],     difficulty: 'Intermediate' as const },
    { id: '5', title: 'Criminal Justice System',                 description: 'Overview of the Philippine criminal justice system, processes, and institutional relationships.',                                                                duration: '25 hours', materials: ['System diagrams', 'Process flowcharts', 'Legal frameworks'],         difficulty: 'Beginner' as const },
    { id: '6', title: 'Correctional Administration',             description: 'Prison management, rehabilitation programs, and correctional officer responsibilities.',                                                                         duration: '30 hours', materials: ['Administrative guidelines', 'Program manuals', 'Case studies'],       difficulty: 'Intermediate' as const },
  ];

  const difficultyStyle = (d: string) => {
    if (d === 'Beginner')     return { bg: 'rgba(16,185,129,0.1)',  color: 'var(--success)',  border: 'var(--success)' };
    if (d === 'Intermediate') return { bg: 'rgba(245,158,11,0.1)',  color: 'var(--warning)',  border: 'var(--warning)' };
    return                           { bg: 'rgba(239,68,68,0.1)',   color: 'var(--error)',    border: 'var(--error)' };
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animate'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    cardsRef.current?.querySelectorAll('.topic-card').forEach(el => observer.observe(el));
    approachRef.current?.querySelectorAll('.approach-item').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ── Topics Page ── */
        .topics { width: 100%; }

        /* ─────────────────────────────────────
           HERO
        ───────────────────────────────────── */
        .topics-hero {
          background: linear-gradient(135deg, var(--primary-blue) 0%, #1d4ed8 60%, var(--secondary-blue) 100%);
          background-size: 300% 300%;
          animation: gradientShift 14s ease infinite;
          color: var(--white);
          padding: 3.5rem 0 4.5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .topics-hero::before {
          content: '';
          position: absolute;
          bottom: -2px; left: 0; right: 0;
          height: 60px;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 60'%3E%3Cpath fill='%23f9fafb' d='M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z'/%3E%3C/svg%3E") no-repeat bottom;
          background-size: cover;
          z-index: 2;
        }

        .topics-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none;
        }

        .topics-hero .hero-inner { position: relative; z-index: 1; }

        .topics-hero h1 {
          color: var(--white);
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
          animation: fadeInDown 0.65s cubic-bezier(0.22,1,0.36,1) both 0.1s;
        }

        .topics-hero .hero-subtitle {
          font-size: 1.15rem;
          color: rgba(255,255,255,0.88);
          font-weight: 500;
          max-width: 600px;
          margin: 0 auto;
          animation: fadeInUp 0.65s cubic-bezier(0.22,1,0.36,1) both 0.25s;
        }

        /* ─────────────────────────────────────
           OVERVIEW STATS
        ───────────────────────────────────── */
        .topics-overview {
          padding: 3.5rem 0;
          background-color: var(--gray-50);
        }

        .overview-stats {
          display: flex;
          justify-content: center;
          gap: 5rem;
          flex-wrap: wrap;
        }

        .stat-item {
          text-align: center;
          animation: scaleIn 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }

        .stat-item:nth-child(1) { animation-delay: 0.05s; }
        .stat-item:nth-child(2) { animation-delay: 0.15s; }
        .stat-item:nth-child(3) { animation-delay: 0.25s; }

        .stat-item h3 {
          font-size: 3.2rem;
          color: var(--accent-gold);
          font-weight: 800;
          margin-bottom: 0.4rem;
          line-height: 1;
        }

        .stat-item p {
          color: var(--text-dark);
          font-weight: 700;
          font-size: 1.05rem;
          margin: 0;
        }

        /* ─────────────────────────────────────
           TOPICS GRID
        ───────────────────────────────────── */
        .topics-content {
          padding: 5rem 0;
          background-color: var(--white);
        }

        .topics-content h2 {
          color: var(--primary-blue);
          font-size: 2.4rem;
          font-weight: 800;
          text-align: center;
          margin-bottom: 3rem;
          animation: fadeInUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }

        .topics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 1.75rem;
        }

        .topic-card {
          background: var(--white);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          padding: 2rem;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.55s cubic-bezier(0.22,1,0.36,1),
                      transform 0.55s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.3s ease;
        }

        /* shimmer top bar */
        .topic-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-blue), var(--accent-gold));
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }

        .topic-card:nth-child(1) { transition-delay: 0.05s; }
        .topic-card:nth-child(2) { transition-delay: 0.12s; }
        .topic-card:nth-child(3) { transition-delay: 0.19s; }
        .topic-card:nth-child(4) { transition-delay: 0.26s; }
        .topic-card:nth-child(5) { transition-delay: 0.33s; }
        .topic-card:nth-child(6) { transition-delay: 0.40s; }

        .topic-card.animate {
          opacity: 1;
          transform: translateY(0);
        }

        .topic-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(30,58,138,0.14);
        }

        .topic-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 0.85rem;
        }

        .topic-card h3 {
          color: var(--primary-blue);
          font-size: 1.2rem;
          font-weight: 700;
          line-height: 1.35;
          margin: 0;
          flex: 1;
        }

        .difficulty-badge {
          padding: 0.22rem 0.7rem;
          border-radius: 14px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          white-space: nowrap;
          flex-shrink: 0;
          border: 1px solid;
        }

        .topic-description {
          color: var(--text-light);
          line-height: 1.65;
          margin-bottom: 1.4rem;
          font-size: 0.97rem;
        }

        .topic-details { margin-bottom: 1.75rem; }

        .duration {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.85rem;
          padding: 0.65rem 0.85rem;
          background-color: var(--gray-50);
          border-radius: var(--radius-md);
        }

        .duration .label {
          font-weight: 600;
          color: var(--text-dark);
          font-size: 0.9rem;
        }

        .duration .value {
          color: var(--accent-gold);
          font-weight: 800;
          font-size: 0.95rem;
        }

        .materials .label {
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 0.5rem;
          display: block;
          font-size: 0.9rem;
        }

        .materials ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .materials li {
          padding: 0.45rem 0 0.45rem 1.4rem;
          color: var(--text-light);
          border-bottom: 1px solid var(--gray-200);
          position: relative;
          font-size: 0.93rem;
          transition: color 0.2s ease, padding-left 0.2s ease;
        }

        .materials li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--success);
          font-weight: 800;
          font-size: 0.85rem;
        }

        .materials li:last-child { border-bottom: none; }
        .materials li:hover { color: var(--primary-blue); padding-left: 1.7rem; }

        .topic-cta {
          width: 100%;
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          color: var(--white);
          border: none;
          padding: 0.75rem;
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 0.92rem;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 3px 10px rgba(30,58,138,0.25);
        }

        .topic-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(30,58,138,0.35);
        }

        /* ─────────────────────────────────────
           STUDY APPROACH
        ───────────────────────────────────── */
        .study-approach {
          padding: 5rem 0;
          background-color: var(--gray-50);
        }

        .study-approach h2 {
          color: var(--primary-blue);
          font-size: 2.4rem;
          font-weight: 800;
          text-align: center;
          margin-bottom: 3rem;
          animation: fadeInUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }

        .approach-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }

        .approach-item {
          background: var(--white);
          padding: 2rem;
          border-radius: var(--radius-lg);
          text-align: center;
          box-shadow: var(--shadow-md);
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1),
                      transform 0.5s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .approach-item::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--accent-gold), var(--primary-blue));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }

        .approach-item:hover::after { transform: scaleX(1); }

        .approach-item:nth-child(1) { transition-delay: 0.05s; }
        .approach-item:nth-child(2) { transition-delay: 0.15s; }
        .approach-item:nth-child(3) { transition-delay: 0.25s; }
        .approach-item:nth-child(4) { transition-delay: 0.35s; }

        .approach-item.animate {
          opacity: 1;
          transform: translateY(0);
        }

        .approach-item:hover {
          transform: translateY(-7px);
          box-shadow: 0 16px 40px rgba(30,58,138,0.12);
        }

        .approach-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          display: block;
        }

        .approach-item h3 {
          color: var(--primary-blue);
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }

        .approach-item p {
          color: var(--text-light);
          line-height: 1.65;
          font-size: 0.95rem;
        }

        /* ─────────────────────────────────────
           SCHEDULE INFO
        ───────────────────────────────────── */
        .schedule-info {
          padding: 5rem 0;
          background: var(--white);
        }

        .schedule-info h2 {
          color: var(--primary-blue);
          font-size: 2.4rem;
          font-weight: 800;
          text-align: center;
          margin-bottom: 3rem;
          animation: fadeInUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }

        .schedule-card {
          max-width: 760px;
          margin: 0 auto;
          background: linear-gradient(135deg, var(--primary-blue) 0%, #1d4ed8 60%, var(--secondary-blue) 100%);
          color: var(--white);
          padding: 3rem;
          border-radius: var(--radius-xl);
          box-shadow: 0 20px 50px rgba(30,58,138,0.25);
          position: relative;
          overflow: hidden;
          animation: scaleIn 0.65s cubic-bezier(0.22,1,0.36,1) both 0.15s;
        }

        .schedule-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 30px 30px;
          pointer-events: none;
        }

        .schedule-card h3 {
          color: var(--light-gold);
          font-size: 1.8rem;
          font-weight: 800;
          text-align: center;
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
        }

        .schedule-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
        }

        .schedule-item {
          background: rgba(255,255,255,0.1);
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255,255,255,0.2);
          text-align: center;
          transition: background 0.3s ease, transform 0.3s ease;
        }

        .schedule-item:hover {
          background: rgba(255,255,255,0.18);
          transform: translateY(-4px);
        }

        .day-type {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--light-gold);
          margin-bottom: 0.4rem;
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }

        .day-count {
          font-size: 3rem;
          font-weight: 800;
          color: var(--white);
          line-height: 1;
          margin-bottom: 0.4rem;
          display: block;
        }

        .day-description {
          color: rgba(255,255,255,0.8);
          font-size: 0.88rem;
          line-height: 1.4;
        }

        .schedule-note {
          text-align: center;
          padding: 1rem 1.25rem;
          background: rgba(217,119,6,0.2);
          border-radius: var(--radius-md);
          border: 1px solid rgba(217,119,6,0.35);
          position: relative;
          z-index: 1;
        }

        .schedule-note p {
          margin: 0;
          color: rgba(255,255,255,0.88);
          font-size: 0.92rem;
        }

        /* ─────────────────────────────────────
           RESPONSIVE
        ───────────────────────────────────── */
        @media (max-width: 768px) {
          .topics-hero h1 { font-size: 2.2rem; }
          .topics-hero .hero-subtitle { font-size: 1rem; }
          .overview-stats { gap: 3rem; }
          .stat-item h3 { font-size: 2.5rem; }
          .topics-grid { grid-template-columns: 1fr; }
          .topic-header { flex-direction: column; align-items: flex-start; }
          .approach-grid { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
          .schedule-details { grid-template-columns: 1fr; }
          .schedule-card { padding: 2rem; }
          .schedule-card h3 { font-size: 1.4rem; }
        }

        @media (max-width: 480px) {
          .topics-hero { padding: 2.5rem 0 3.5rem; }
          .topics-hero h1 { font-size: 1.8rem; }
          .overview-stats { gap: 2rem; }
          .topic-card { padding: 1.5rem; }
          .approach-item { padding: 1.5rem; }
          .approach-icon { font-size: 2.5rem; }
          .schedule-card { padding: 1.5rem; }
        }
      `}</style>

      <div className="topics">
        {/* ── HERO ── */}
        <section className="topics-hero">
          <div className="container hero-inner">
            <h1>CLE Review Topics</h1>
            <p className="hero-subtitle">Comprehensive coverage of all subjects in the Criminologist Licensure Examination</p>
          </div>
        </section>

        {/* ── OVERVIEW STATS ── */}
        <section className="topics-overview">
          <div className="container">
            <div className="overview-stats">
              <div className="stat-item"><h3>6</h3><p>Major Subjects</p></div>
              <div className="stat-item"><h3>195</h3><p>Total Hours</p></div>
              <div className="stat-item"><h3>100%</h3><p>TOS Coverage</p></div>
            </div>
          </div>
        </section>

        {/* ── TOPICS GRID ── */}
        <section className="topics-content">
          <div className="container">
            <h2>Subject Areas</h2>
            <div className="topics-grid" ref={cardsRef}>
              {topics.map(topic => {
                const style = difficultyStyle(topic.difficulty);
                return (
                  <div key={topic.id} className="topic-card">
                    <div className="topic-header">
                      <h3>{topic.title}</h3>
                      <span
                        className="difficulty-badge"
                        style={{ background: style.bg, color: style.color, borderColor: style.border }}
                      >
                        {topic.difficulty}
                      </span>
                    </div>
                    <p className="topic-description">{topic.description}</p>
                    <div className="topic-details">
                      <div className="duration">
                        <span className="label">Duration:</span>
                        <span className="value">{topic.duration}</span>
                      </div>
                      <div className="materials">
                        <span className="label">Materials Included:</span>
                        <ul>
                          {topic.materials.map((m, i) => <li key={i}>{m}</li>)}
                        </ul>
                      </div>
                    </div>
                    <button className="topic-cta">View Details →</button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── STUDY APPROACH ── */}
        <section className="study-approach">
          <div className="container">
            <h2>Our Study Approach</h2>
            <div className="approach-grid" ref={approachRef}>
              <div className="approach-item">
                <span className="approach-icon">📚</span>
                <h3>TOS-Based Learning</h3>
                <p>All materials are aligned with the official Table of Specifications to ensure comprehensive coverage of exam topics.</p>
              </div>
              <div className="approach-item">
                <span className="approach-icon">🎯</span>
                <h3>Mock Examinations</h3>
                <p>Regular practice tests simulate actual board exam conditions to build confidence and test-taking skills.</p>
              </div>
              <div className="approach-item">
                <span className="approach-icon">👥</span>
                <h3>Interactive Learning</h3>
                <p>Combination of online and face-to-face sessions ensures flexible and comprehensive learning experience.</p>
              </div>
              <div className="approach-item">
                <span className="approach-icon">📊</span>
                <h3>Progress Tracking</h3>
                <p>Regular assessments and feedback help monitor progress and identify areas for improvement.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SCHEDULE ── */}
        <section className="schedule-info">
          <div className="container">
            <h2>Review Schedule</h2>
            <div className="schedule-card">
              <h3>Hybrid Learning Format</h3>
              <div className="schedule-details">
                <div className="schedule-item">
                  <div className="day-type">Online Sessions</div>
                  <span className="day-count">3</span>
                  <div className="day-description">Days per week — interactive classes with live instructors</div>
                </div>
                <div className="schedule-item">
                  <div className="day-type">Face-to-Face Sessions</div>
                  <span className="day-count">3</span>
                  <div className="day-description">Days per week — in-person coaching and practical exercises</div>
                </div>
              </div>
              <div className="schedule-note">
                <p><strong>Note:</strong> Schedule may be adjusted based on student needs and exam timeline.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Topics;
