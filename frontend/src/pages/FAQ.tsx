import React, { useState, useEffect, useRef } from 'react';

const FAQ: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const listRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);

  const faqs = [
    { id: '1',  category: 'Registration', question: 'How do I register for the February 2027 CLE review program?',     answer: 'You can register online through our website or visit our center at 307 Col. Salazar St., Signal Village, Taguig. You only need to pay ₱1,000 as down payment to secure your slot, with the remaining balance payable before the review starts.' },
    { id: '2',  category: 'Registration', question: 'What is the registration deadline?',                               answer: 'Registration is ongoing, but slots are limited. We recommend registering as early as possible to secure your spot. The final registration deadline is typically 2 weeks before the review program begins.' },
    { id: '3',  category: 'Payment',      question: 'What are the payment options available?',                          answer: 'We accept cash payments at our center, bank transfers, and GCash. The promo fee is ₱10,000 (down from ₱13,000) with only ₱1,000 required as down payment to reserve your slot.' },
    { id: '4',  category: 'Payment',      question: 'Is the ₱1,000 down payment refundable?',                          answer: 'The down payment is non-refundable once paid, as it secures your slot in the program. However, it will be deducted from your total review fee.' },
    { id: '5',  category: 'Program',      question: 'What does the review program include?',                            answer: 'Your review fee includes: FREE Review T-Shirt, Test Papers, Answer Sheets, Weekly Mock Board Examinations, Board Examination Simulation, TOS-Based Books, Logbook and Ballpen, Online Review, Face-to-Face Final Coaching, and Quick Refresh Sessions.' },
    { id: '6',  category: 'Program',      question: 'How many days per week is the review?',                           answer: 'We offer a hybrid format with 3 days online review and 3 days face-to-face review every week. This provides flexibility while ensuring comprehensive coverage of all subjects.' },
    { id: '7',  category: 'Schedule',     question: 'What time do classes start and end?',                             answer: 'Online sessions typically run from 7:00 PM to 10:00 PM on weekdays. Face-to-face sessions are usually scheduled on weekends from 8:00 AM to 5:00 PM. Specific schedules will be provided upon enrollment.' },
    { id: '8',  category: 'Schedule',     question: 'Can I attend if I have a full-time job?',                         answer: 'Yes! Our program is designed for working professionals. With evening online sessions and weekend face-to-face classes, you can maintain your job while preparing for the CLE.' },
    { id: '9',  category: 'Materials',    question: 'Are the review materials updated for the 2027 CLE?',              answer: 'Absolutely! All our materials are based on the latest Table of Specifications (TOS) and include recent updates in criminal law, jurisprudence, and examination format changes.' },
    { id: '10', category: 'Materials',    question: 'Do I need to buy additional books or materials?',                 answer: 'No additional purchases are required. All necessary materials including TOS-based books, test papers, answer sheets, and other resources are included in your review fee.' },
    { id: '11', category: 'Location',     question: 'Where is the review center located?',                             answer: 'Rosarian Review Center is located at 307 Col. Salazar St., Corner Col. Rongo, Central Signal Village (Signal Village), Taguig. We are easily accessible by public transportation.' },
    { id: '12', category: 'Location',     question: 'Is parking available at the center?',                             answer: 'Yes, we have limited parking spaces available for students. We also recommend using public transportation as the center is accessible via jeepney and bus routes.' },
    { id: '13', category: 'Exam',         question: 'What is the expected pass rate for February 2027 CLE?',           answer: 'While pass rates depend on individual preparation and the Professional Regulation Commission, our review center has historically maintained a high success rate of over 90% among our students.' },
    { id: '14', category: 'Exam',         question: 'Do you provide exam simulation sessions?',                        answer: 'Yes! We conduct regular mock board examinations and a comprehensive board examination simulation with detailed rationalization to help you prepare for the actual exam conditions.' },
    { id: '15', category: 'Support',      question: 'Is there support available during the review period?',            answer: 'Yes, our instructors are available for consultation during and after class hours. We also have online support through our Facebook page and contact number for any questions or concerns.' },
  ];

  const categories = ['All', 'Registration', 'Payment', 'Program', 'Schedule', 'Materials', 'Location', 'Exam', 'Support'];

  const filteredFAQs = selectedCategory === 'All'
    ? faqs
    : faqs.filter(f => f.category === selectedCategory);

  const toggleFAQ = (id: string) => setActiveId(activeId === id ? null : id);

  /* scroll-reveal for resource cards */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animate'); }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    resourcesRef.current?.querySelectorAll('.resource-item').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ── FAQ Page ── */
        .faq { width: 100%; }

        /* ─────────────────────────────────────
           HERO
        ───────────────────────────────────── */
        .faq-hero {
          background: linear-gradient(135deg, var(--primary-blue) 0%, #1d4ed8 60%, var(--secondary-blue) 100%);
          background-size: 300% 300%;
          animation: gradientShift 14s ease infinite;
          color: var(--white);
          padding: 3.5rem 0 4.5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .faq-hero::before {
          content: '';
          position: absolute;
          bottom: -2px; left: 0; right: 0;
          height: 60px;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 60'%3E%3Cpath fill='%23ffffff' d='M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z'/%3E%3C/svg%3E") no-repeat bottom;
          background-size: cover;
          z-index: 2;
        }

        .faq-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none;
        }

        .faq-hero .hero-inner {
          position: relative;
          z-index: 1;
        }

        .faq-hero h1 {
          color: var(--white);
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
          animation: fadeInDown 0.65s cubic-bezier(0.22,1,0.36,1) both 0.1s;
        }

        .faq-hero .hero-subtitle {
          font-size: 1.15rem;
          color: rgba(255,255,255,0.88);
          font-weight: 500;
          max-width: 540px;
          margin: 0 auto;
          animation: fadeInUp 0.65s cubic-bezier(0.22,1,0.36,1) both 0.25s;
        }

        /* ─────────────────────────────────────
           SEARCH
        ───────────────────────────────────── */
        .faq-search {
          padding: 2.25rem 0;
          background-color: var(--white);
          animation: fadeInDown 0.5s cubic-bezier(0.22,1,0.36,1) both 0.35s;
        }

        .search-bar {
          display: flex;
          max-width: 600px;
          margin: 0 auto;
          box-shadow: 0 8px 30px rgba(30,58,138,0.12);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: box-shadow 0.3s ease;
        }

        .search-bar:focus-within {
          box-shadow: 0 8px 30px rgba(30,58,138,0.25);
        }

        .search-input {
          flex: 1;
          padding: 1rem 1.5rem;
          border: 2px solid var(--gray-200);
          border-right: none;
          font-size: 1rem;
          color: var(--text-dark);
          outline: none;
          border-radius: var(--radius-lg) 0 0 var(--radius-lg);
          transition: border-color 0.25s ease;
        }

        .search-input:focus { border-color: var(--primary-blue); }

        .search-input::placeholder { color: var(--gray-300); }

        .search-button {
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          color: var(--white);
          border: none;
          padding: 1rem 1.5rem;
          cursor: pointer;
          transition: opacity 0.25s ease;
          border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
          font-size: 1.1rem;
        }

        .search-button:hover { opacity: 0.88; }

        /* ─────────────────────────────────────
           FILTER TABS
        ───────────────────────────────────── */
        .faq-filter {
          padding: 1.25rem 0;
          background-color: var(--gray-50);
          border-bottom: 1px solid var(--gray-200);
        }

        .filter-tabs {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .filter-tab {
          padding: 0.45rem 1rem;
          border: 2px solid var(--gray-200);
          background-color: var(--white);
          color: var(--text-light);
          border-radius: 20px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.84rem;
          transition: border-color 0.2s ease, color 0.2s ease,
                      background 0.2s ease, transform 0.2s ease,
                      box-shadow 0.2s ease;
        }

        .filter-tab:hover {
          border-color: var(--primary-blue);
          color: var(--primary-blue);
          transform: translateY(-2px);
        }

        .filter-tab.active {
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          border-color: transparent;
          color: var(--white);
          box-shadow: 0 4px 12px rgba(30,58,138,0.3);
          transform: translateY(-2px);
        }

        /* ─────────────────────────────────────
           FAQ LIST
        ───────────────────────────────────── */
        .faq-content {
          padding: 3.5rem 0;
          background-color: var(--white);
        }

        .faq-list {
          max-width: 820px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .faq-item {
          background: var(--white);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          overflow: hidden;
          border: 1px solid var(--gray-200);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          animation: fadeInUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }

        .faq-item:nth-child(1)  { animation-delay: 0.05s; }
        .faq-item:nth-child(2)  { animation-delay: 0.10s; }
        .faq-item:nth-child(3)  { animation-delay: 0.15s; }
        .faq-item:nth-child(4)  { animation-delay: 0.20s; }
        .faq-item:nth-child(5)  { animation-delay: 0.25s; }
        .faq-item:nth-child(6)  { animation-delay: 0.30s; }
        .faq-item:nth-child(7)  { animation-delay: 0.35s; }
        .faq-item:nth-child(8)  { animation-delay: 0.40s; }

        .faq-item:hover {
          box-shadow: 0 8px 25px rgba(30,58,138,0.12);
          transform: translateY(-2px);
        }

        .faq-item.open {
          border-color: var(--secondary-blue);
          box-shadow: 0 8px 25px rgba(30,58,138,0.15);
        }

        .faq-question {
          width: 100%;
          background: none;
          border: none;
          padding: 1.4rem 1.5rem;
          text-align: left;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          transition: background 0.25s ease;
        }

        .faq-question:hover { background-color: var(--gray-50); }

        .question-text {
          color: var(--primary-blue);
          font-weight: 700;
          font-size: 1.05rem;
          line-height: 1.45;
        }

        .faq-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          min-width: 28px;
          background: var(--light-blue);
          border-radius: 50%;
          color: var(--primary-blue);
          font-size: 1.1rem;
          font-weight: 800;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                      background 0.25s ease, color 0.25s ease;
        }

        .faq-icon.open {
          transform: rotate(45deg);
          background: var(--primary-blue);
          color: var(--white);
        }

        .faq-answer {
          padding: 0 1.5rem 1.5rem;
          border-top: 1px solid var(--gray-200);
          animation: slideDown 0.35s cubic-bezier(0.22,1,0.36,1) both;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .faq-answer p {
          color: var(--text-dark);
          line-height: 1.7;
          margin: 1rem 0 0.75rem;
          font-size: 0.97rem;
        }

        .faq-category {
          display: inline-block;
          background: var(--light-blue);
          color: var(--primary-blue);
          padding: 0.2rem 0.7rem;
          border-radius: 12px;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        /* ─────────────────────────────────────
           CONTACT SUPPORT
        ───────────────────────────────────── */
        .contact-support {
          padding: 5rem 0;
          background: linear-gradient(135deg, var(--primary-blue) 0%, #1d4ed8 60%, var(--secondary-blue) 100%);
          position: relative;
          overflow: hidden;
        }

        .contact-support::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none;
        }

        .support-card {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(12px);
          border-radius: var(--radius-xl);
          padding: 3rem;
          color: var(--white);
          text-align: center;
          border: 1px solid rgba(255,255,255,0.2);
          position: relative;
          z-index: 1;
          animation: scaleIn 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }

        .support-card h2 {
          color: var(--white);
          font-size: 2.4rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
        }

        .support-card > p {
          color: rgba(255,255,255,0.88);
          font-size: 1.05rem;
          margin-bottom: 2.5rem;
          max-width: 520px;
          margin-left: auto;
          margin-right: auto;
        }

        .contact-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .contact-option {
          background: rgba(255,255,255,0.1);
          padding: 1.75rem;
          border-radius: var(--radius-lg);
          text-align: center;
          border: 1px solid rgba(255,255,255,0.2);
          transition: transform 0.3s ease, background 0.3s ease;
          animation: fadeInUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }

        .contact-option:nth-child(1) { animation-delay: 0.1s; }
        .contact-option:nth-child(2) { animation-delay: 0.2s; }
        .contact-option:nth-child(3) { animation-delay: 0.3s; }

        .contact-option:hover {
          background: rgba(255,255,255,0.18);
          transform: translateY(-6px);
        }

        .contact-icon {
          font-size: 2.5rem;
          margin-bottom: 0.75rem;
          display: block;
        }

        .contact-info h3 {
          color: var(--light-gold);
          font-size: 1.1rem;
          margin-bottom: 0.4rem;
          font-weight: 700;
        }

        .contact-info p {
          color: rgba(255,255,255,0.92);
          font-weight: 600;
          margin-bottom: 0.2rem;
          font-size: 0.95rem;
        }

        .contact-info small {
          color: rgba(255,255,255,0.65);
          font-size: 0.85rem;
        }

        .contact-button {
          background: linear-gradient(135deg, var(--accent-gold) 0%, var(--dark-gold) 100%);
          color: var(--white);
          border: none;
          padding: 1rem 2.5rem;
          font-size: 1.05rem;
          font-weight: 700;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 6px 20px rgba(217,119,6,0.4);
        }

        .contact-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(217,119,6,0.5);
        }

        /* ─────────────────────────────────────
           HELPFUL RESOURCES
        ───────────────────────────────────── */
        .helpful-resources {
          padding: 5rem 0;
          background-color: var(--gray-50);
        }

        .helpful-resources .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .helpful-resources h2 {
          color: var(--primary-blue);
          font-size: 2.4rem;
          font-weight: 800;
          margin-bottom: 0;
        }

        .section-tag-light {
          display: inline-block;
          background: var(--light-blue);
          color: var(--primary-blue);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.3rem 0.85rem;
          border-radius: 20px;
          margin-bottom: 0.6rem;
        }

        .faq-resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }

        .resource-item {
          background: var(--white);
          padding: 2rem;
          border-radius: var(--radius-lg);
          text-align: center;
          box-shadow: var(--shadow-md);
          border-top: 4px solid var(--accent-gold);
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1),
                      transform 0.5s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.3s ease;
        }

        .resource-item:nth-child(1) { transition-delay: 0.05s; }
        .resource-item:nth-child(2) { transition-delay: 0.15s; }
        .resource-item:nth-child(3) { transition-delay: 0.25s; }
        .resource-item:nth-child(4) { transition-delay: 0.35s; }

        .resource-item.animate {
          opacity: 1;
          transform: translateY(0);
        }

        .resource-item:hover {
          transform: translateY(-7px);
          box-shadow: 0 16px 40px rgba(30,58,138,0.12);
        }

        .resource-item h3 {
          color: var(--primary-blue);
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }

        .resource-item p {
          color: var(--text-light);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .resource-link {
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          color: var(--white);
          border: none;
          padding: 0.65rem 1.4rem;
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 3px 10px rgba(30,58,138,0.25);
        }

        .resource-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(30,58,138,0.35);
        }

        /* ─────────────────────────────────────
           RESPONSIVE
        ───────────────────────────────────── */
        @media (max-width: 768px) {
          .faq-hero h1 { font-size: 2.2rem; }
          .faq-hero .hero-subtitle { font-size: 1rem; }
          .search-bar { flex-direction: column; border-radius: var(--radius-md); }
          .search-input {
            border-right: 2px solid var(--gray-200);
            border-bottom: none;
            border-radius: var(--radius-md) var(--radius-md) 0 0;
          }
          .search-button { border-radius: 0 0 var(--radius-md) var(--radius-md); }
          .filter-tabs { gap: 0.3rem; padding: 0 1rem; }
          .filter-tab { padding: 0.4rem 0.75rem; font-size: 0.8rem; }
          .faq-question { padding: 1.1rem; }
          .question-text { font-size: 0.97rem; }
          .faq-answer { padding: 0 1.1rem 1.1rem; }
          .contact-options { grid-template-columns: 1fr; }
          .support-card { padding: 2rem; }
          .support-card h2 { font-size: 2rem; }
          .faq-resources-grid { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
        }

        @media (max-width: 480px) {
          .faq-hero { padding: 2.5rem 0 3.5rem; }
          .faq-hero h1 { font-size: 1.8rem; }
          .support-card { padding: 1.5rem; }
          .support-card h2 { font-size: 1.6rem; }
          .contact-option { padding: 1.25rem; }
          .resource-item { padding: 1.5rem; }
        }
      `}</style>

      <div className="faq">
        {/* ── HERO ── */}
        <section className="faq-hero">
          <div className="container hero-inner">
            <h1>Frequently Asked Questions</h1>
            <p className="hero-subtitle">
              Find answers to common questions about our CLE review program
            </p>
          </div>
        </section>

        {/* ── SEARCH ── */}
        <section className="faq-search">
          <div className="container">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search for answers..."
                className="search-input"
              />
              <button className="search-button">🔍</button>
            </div>
          </div>
        </section>

        {/* ── FILTER ── */}
        <section className="faq-filter">
          <div className="container">
            <div className="filter-tabs">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-tab ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ LIST ── */}
        <section className="faq-content">
          <div className="container">
            <div className="faq-list" ref={listRef}>
              {filteredFAQs.map(faq => {
                const isOpen = activeId === faq.id;
                return (
                  <div key={faq.id} className={`faq-item ${isOpen ? 'open' : ''}`}>
                    <button
                      className="faq-question"
                      onClick={() => toggleFAQ(faq.id)}
                      aria-expanded={isOpen}
                    >
                      <span className="question-text">{faq.question}</span>
                      <span className={`faq-icon ${isOpen ? 'open' : ''}`}>+</span>
                    </button>
                    {isOpen && (
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                        <span className="faq-category">{faq.category}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CONTACT SUPPORT ── */}
        <section className="contact-support">
          <div className="container">
            <div className="support-card">
              <h2>Still have questions?</h2>
              <p>Can't find the answer you're looking for? Our support team is here to help!</p>
              <div className="contact-options">
                <div className="contact-option">
                  <span className="contact-icon">📞</span>
                  <div className="contact-info">
                    <h3>Call Us</h3>
                    <p>0926-024-5057</p>
                    <small>Mon–Fri: 8AM–6PM, Sat: 8AM–4PM</small>
                  </div>
                </div>
                <div className="contact-option">
                  <span className="contact-icon">📍</span>
                  <div className="contact-info">
                    <h3>Visit Us</h3>
                    <p>307 Col. Salazar St., Signal Village, Taguig</p>
                    <small>Walk-ins welcome during office hours</small>
                  </div>
                </div>
                <div className="contact-option">
                  <span className="contact-icon">💬</span>
                  <div className="contact-info">
                    <h3>Message Us</h3>
                    <p>Facebook: Rosarian Review Center</p>
                    <small>We typically respond within 2 hours</small>
                  </div>
                </div>
              </div>
              <button className="contact-button">Get in Touch</button>
            </div>
          </div>
        </section>

        {/* ── HELPFUL RESOURCES ── */}
        <section className="helpful-resources">
          <div className="container">
            <div className="section-header">
              <span className="section-tag-light">Quick Links</span>
              <h2>Helpful Resources</h2>
            </div>
            <div className="faq-resources-grid" ref={resourcesRef}>
              <div className="resource-item">
                <h3>📚 Study Guide</h3>
                <p>Download our comprehensive CLE preparation guide</p>
                <button className="resource-link">Download PDF</button>
              </div>
              <div className="resource-item">
                <h3>📅 Exam Calendar</h3>
                <p>Important dates and deadlines for February 2027 CLE</p>
                <button className="resource-link">View Calendar</button>
              </div>
              <div className="resource-item">
                <h3>💡 Study Tips</h3>
                <p>Expert advice on how to prepare effectively for the CLE</p>
                <button className="resource-link">Read Tips</button>
              </div>
              <div className="resource-item">
                <h3>🎯 Practice Tests</h3>
                <p>Take sample examinations to test your knowledge</p>
                <button className="resource-link">Start Test</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FAQ;
