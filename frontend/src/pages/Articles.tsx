import React, { useEffect, useRef } from 'react';

const Articles: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);

  const articles = [
    { id: '1', title: 'Top 10 Study Tips for CLE Success',                   summary: 'Proven strategies to help you pass the Criminologist Licensure Examination on your first attempt.',                         author: 'Prof. Maria Santos',   publishDate: new Date('2026-08-20'), category: 'Study Tips',    tags: ['study methods', 'exam preparation', 'CLE'],       readTime: '5 min read' },
    { id: '2', title: 'Understanding the New CLE Format for 2027',           summary: 'Comprehensive guide to the updated examination format and what candidates need to know.',                                       author: 'Dr. Juan Dela Cruz',   publishDate: new Date('2026-08-18'), category: 'Exam Updates',  tags: ['CLE 2027', 'exam format', 'updates'],              readTime: '8 min read' },
    { id: '3', title: 'Career Opportunities for Licensed Criminologists',    summary: 'Explore the various career paths available for newly licensed criminology professionals.',                                     author: 'Atty. Rosa Garcia',    publishDate: new Date('2026-08-15'), category: 'Career Guide',  tags: ['career', 'opportunities', 'criminology'],          readTime: '10 min read' },
    { id: '4', title: "Managing Exam Anxiety: A Student's Guide",            summary: 'Practical techniques to overcome test anxiety and perform your best on examination day.',                                       author: 'Dr. Patricia Reyes',   publishDate: new Date('2026-08-12'), category: 'Mental Health', tags: ['anxiety', 'mental health', 'exam prep'],           readTime: '6 min read' },
    { id: '5', title: 'Criminal Law Updates: Recent Jurisprudence',          summary: 'Stay updated with the latest Supreme Court decisions relevant to the CLE examination.',                                         author: 'Judge Carlos Martinez',publishDate: new Date('2026-08-10'), category: 'Legal Updates', tags: ['criminal law', 'jurisprudence', 'updates'],        readTime: '12 min read' },
    { id: '6', title: 'Effective Note-Taking Strategies for Review',         summary: 'Learn how to create comprehensive notes that will serve you well during review and examination.',                               author: 'Prof. Ana Gonzales',   publishDate: new Date('2026-08-08'), category: 'Study Tips',    tags: ['note-taking', 'study methods', 'organization'],   readTime: '7 min read' },
  ];

  const categories = ['All', 'Study Tips', 'Exam Updates', 'Career Guide', 'Mental Health', 'Legal Updates'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  /* scroll-reveal for resource cards */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animate'); }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    resourcesRef.current?.querySelectorAll('.resource-card').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ── Articles Page ── */
        .articles { width: 100%; }

        /* ─────────────────────────────────────
           HERO
        ───────────────────────────────────── */
        .articles-hero {
          background: linear-gradient(135deg, var(--primary-blue) 0%, #1d4ed8 60%, var(--secondary-blue) 100%);
          background-size: 300% 300%;
          animation: gradientShift 14s ease infinite;
          color: var(--white);
          padding: 3.5rem 0 4.5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .articles-hero::before {
          content: '';
          position: absolute;
          bottom: -2px; left: 0; right: 0;
          height: 60px;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 60'%3E%3Cpath fill='%23f9fafb' d='M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z'/%3E%3C/svg%3E") no-repeat bottom;
          background-size: cover;
          z-index: 2;
        }

        .articles-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none;
        }

        .articles-hero .hero-inner { position: relative; z-index: 1; }

        .articles-hero h1 {
          color: var(--white);
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
          animation: fadeInDown 0.65s cubic-bezier(0.22,1,0.36,1) both 0.1s;
        }

        .articles-hero .hero-subtitle {
          font-size: 1.15rem;
          color: rgba(255,255,255,0.88);
          font-weight: 500;
          max-width: 540px;
          margin: 0 auto;
          animation: fadeInUp 0.65s cubic-bezier(0.22,1,0.36,1) both 0.25s;
        }

        /* ─────────────────────────────────────
           FILTER
        ───────────────────────────────────── */
        .articles-filter {
          padding: 1.5rem 0;
          background-color: var(--white);
          border-bottom: 1px solid var(--gray-200);
          position: sticky;
          top: 80px;
          z-index: 100;
        }

        .articles-filter .filter-tabs {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .articles-filter .filter-tab {
          padding: 0.55rem 1.25rem;
          border: 2px solid var(--gray-200);
          background-color: var(--white);
          color: var(--text-light);
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.88rem;
          transition: border-color 0.2s ease, color 0.2s ease,
                      background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }

        .articles-filter .filter-tab:hover {
          border-color: var(--primary-blue);
          color: var(--primary-blue);
          transform: translateY(-2px);
        }

        .articles-filter .filter-tab.active {
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          border-color: transparent;
          color: var(--white);
          box-shadow: 0 4px 12px rgba(30,58,138,0.3);
          transform: translateY(-2px);
        }

        /* ─────────────────────────────────────
           ARTICLES GRID
        ───────────────────────────────────── */
        .articles-content {
          padding: 4.5rem 0;
          background-color: var(--gray-50);
        }

        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 1.75rem;
        }

        .article-card {
          background: var(--white);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          padding: 2rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
          animation: fadeInUp 0.55s cubic-bezier(0.22,1,0.36,1) both;
        }

        .article-card:nth-child(1) { animation-delay: 0.05s; }
        .article-card:nth-child(2) { animation-delay: 0.12s; }
        .article-card:nth-child(3) { animation-delay: 0.19s; }
        .article-card:nth-child(4) { animation-delay: 0.26s; }
        .article-card:nth-child(5) { animation-delay: 0.33s; }
        .article-card:nth-child(6) { animation-delay: 0.40s; }

        /* top gradient bar */
        .article-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-blue), var(--accent-gold));
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }

        .article-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(30,58,138,0.14);
        }

        .article-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .article-category {
          background-color: var(--light-blue);
          color: var(--primary-blue);
          padding: 0.22rem 0.7rem;
          border-radius: 12px;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .article-date {
          color: var(--text-light);
          font-size: 0.87rem;
          font-weight: 500;
        }

        .article-title {
          color: var(--primary-blue);
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 0.85rem;
          line-height: 1.35;
        }

        .article-summary {
          color: var(--text-light);
          line-height: 1.65;
          margin-bottom: 1.25rem;
          font-size: 0.97rem;
        }

        .article-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.85rem;
          padding: 0.65rem 0;
          border-top: 1px solid var(--gray-200);
          border-bottom: 1px solid var(--gray-200);
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .article-author {
          color: var(--text-dark);
          font-weight: 600;
          font-size: 0.88rem;
        }

        .article-read-time {
          color: var(--text-light);
          font-size: 0.88rem;
          font-style: italic;
        }

        .article-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.25rem;
        }

        .article-tag {
          background-color: var(--gray-100);
          color: var(--text-light);
          padding: 0.2rem 0.55rem;
          border-radius: 10px;
          font-size: 0.78rem;
          font-weight: 500;
        }

        .article-read-more {
          width: 100%;
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          color: var(--white);
          border: none;
          padding: 0.7rem;
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 0.92rem;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 3px 10px rgba(30,58,138,0.25);
        }

        .article-read-more:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(30,58,138,0.35);
        }

        /* ─────────────────────────────────────
           NEWSLETTER
        ───────────────────────────────────── */
        .newsletter-signup {
          padding: 5rem 0;
          background: linear-gradient(135deg, var(--primary-blue) 0%, #1d4ed8 60%, var(--secondary-blue) 100%);
          position: relative;
          overflow: hidden;
        }

        .newsletter-signup::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none;
        }

        .newsletter-card {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(12px);
          border-radius: var(--radius-xl);
          padding: 3rem;
          text-align: center;
          color: var(--white);
          max-width: 620px;
          margin: 0 auto;
          border: 1px solid rgba(255,255,255,0.2);
          position: relative;
          z-index: 1;
          animation: scaleIn 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }

        .newsletter-card h2 {
          color: var(--white);
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
        }

        .newsletter-card > p {
          color: rgba(255,255,255,0.88);
          margin-bottom: 2rem;
          font-size: 1.05rem;
        }

        .newsletter-form {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .newsletter-input {
          flex: 1;
          padding: 0.875rem 1rem;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: var(--radius-md);
          background: rgba(255,255,255,0.12);
          color: var(--white);
          font-size: 1rem;
          outline: none;
          transition: border-color 0.25s ease, background 0.25s ease;
        }

        .newsletter-input::placeholder { color: rgba(255,255,255,0.6); }

        .newsletter-input:focus {
          border-color: var(--light-gold);
          background: rgba(255,255,255,0.18);
        }

        .newsletter-button {
          background: linear-gradient(135deg, var(--accent-gold), var(--dark-gold));
          color: var(--white);
          border: none;
          padding: 0.875rem 1.75rem;
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 4px 14px rgba(217,119,6,0.4);
          white-space: nowrap;
        }

        .newsletter-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(217,119,6,0.5);
        }

        .newsletter-privacy {
          color: rgba(255,255,255,0.65);
          font-size: 0.87rem;
          margin: 0;
        }

        /* ─────────────────────────────────────
           FEATURED RESOURCES
        ───────────────────────────────────── */
        .featured-resources {
          padding: 5rem 0;
          background-color: var(--white);
        }

        .featured-resources h2 {
          color: var(--primary-blue);
          font-size: 2.4rem;
          font-weight: 800;
          text-align: center;
          margin-bottom: 3rem;
          animation: fadeInUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }

        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }

        .resource-card {
          background: var(--white);
          padding: 2rem;
          border-radius: var(--radius-lg);
          text-align: center;
          box-shadow: var(--shadow-md);
          border: 2px solid var(--gray-200);
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1),
                      transform 0.5s cubic-bezier(0.22,1,0.36,1),
                      border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .resource-card:nth-child(1) { transition-delay: 0.05s; }
        .resource-card:nth-child(2) { transition-delay: 0.15s; }
        .resource-card:nth-child(3) { transition-delay: 0.25s; }
        .resource-card:nth-child(4) { transition-delay: 0.35s; }

        .resource-card.animate {
          opacity: 1;
          transform: translateY(0);
        }

        .resource-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 16px 40px rgba(30,58,138,0.12);
          border-color: var(--primary-blue);
        }

        .resource-icon {
          font-size: 2.8rem;
          margin-bottom: 0.85rem;
          display: block;
        }

        .resource-card h3 {
          color: var(--primary-blue);
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.65rem;
        }

        .resource-card p {
          color: var(--text-light);
          line-height: 1.6;
          margin-bottom: 1.4rem;
          font-size: 0.95rem;
        }

        .resource-button {
          background: linear-gradient(135deg, var(--accent-gold), var(--dark-gold));
          color: var(--white);
          border: none;
          padding: 0.65rem 1.4rem;
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 3px 10px rgba(217,119,6,0.3);
        }

        .resource-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(217,119,6,0.4);
        }

        /* ─────────────────────────────────────
           RESPONSIVE
        ───────────────────────────────────── */
        @media (max-width: 768px) {
          .articles-hero h1 { font-size: 2.2rem; }
          .articles-hero .hero-subtitle { font-size: 1rem; }
          .articles-filter .filter-tabs { gap: 0.3rem; padding: 0 1rem; }
          .articles-filter .filter-tab { padding: 0.45rem 0.9rem; font-size: 0.82rem; }
          .articles-grid { grid-template-columns: 1fr; }
          .article-header { flex-direction: column; align-items: flex-start; }
          .article-meta { flex-direction: column; align-items: flex-start; }
          .newsletter-form { flex-direction: column; }
          .newsletter-card { padding: 2rem; }
          .resources-grid { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
        }

        @media (max-width: 480px) {
          .articles-hero { padding: 2.5rem 0 3.5rem; }
          .articles-hero h1 { font-size: 1.8rem; }
          .article-card { padding: 1.5rem; }
          .article-title { font-size: 1.15rem; }
          .newsletter-card { padding: 1.5rem; }
          .newsletter-card h2 { font-size: 1.6rem; }
          .resource-card { padding: 1.5rem; }
        }
      `}</style>

      <div className="articles">
        {/* ── HERO ── */}
        <section className="articles-hero">
          <div className="container hero-inner">
            <h1>Articles &amp; Resources</h1>
            <p className="hero-subtitle">
              Stay informed with our latest articles, study guides, and expert insights for CLE success
            </p>
          </div>
        </section>

        {/* ── FILTER ── */}
        <section className="articles-filter">
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

        {/* ── ARTICLES GRID ── */}
        <section className="articles-content">
          <div className="container">
            <div className="articles-grid" ref={gridRef}>
              {filteredArticles.map(article => (
                <article key={article.id} className="article-card">
                  <div className="article-header">
                    <div className="article-category">{article.category}</div>
                    <div className="article-date">{formatDate(article.publishDate)}</div>
                  </div>
                  <h2 className="article-title">{article.title}</h2>
                  <p className="article-summary">{article.summary}</p>
                  <div className="article-meta">
                    <span className="article-author">By {article.author}</span>
                    <span className="article-read-time">{article.readTime}</span>
                  </div>
                  <div className="article-tags">
                    {article.tags.map(tag => (
                      <span key={tag} className="article-tag">#{tag}</span>
                    ))}
                  </div>
                  <button className="article-read-more">Read Full Article →</button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <section className="newsletter-signup">
          <div className="container">
            <div className="newsletter-card">
              <h2>Stay Updated</h2>
              <p>Subscribe to our newsletter for the latest articles, exam updates, and study tips delivered to your inbox.</p>
              <form className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-button">Subscribe</button>
              </form>
              <p className="newsletter-privacy">
                We respect your privacy. No spam, just valuable content for CLE success.
              </p>
            </div>
          </div>
        </section>

        {/* ── FEATURED RESOURCES ── */}
        <section className="featured-resources">
          <div className="container">
            <h2>Featured Resources</h2>
            <div className="resources-grid" ref={resourcesRef}>
              <div className="resource-card">
                <span className="resource-icon">📚</span>
                <h3>Study Guides</h3>
                <p>Comprehensive guides covering all CLE subjects</p>
                <button className="resource-button">Download PDF</button>
              </div>
              <div className="resource-card">
                <span className="resource-icon">🎯</span>
                <h3>Practice Tests</h3>
                <p>Mock examinations to test your knowledge</p>
                <button className="resource-button">Take Test</button>
              </div>
              <div className="resource-card">
                <span className="resource-icon">📹</span>
                <h3>Video Lectures</h3>
                <p>Recorded sessions from expert instructors</p>
                <button className="resource-button">Watch Now</button>
              </div>
              <div className="resource-card">
                <span className="resource-icon">💡</span>
                <h3>Exam Tips</h3>
                <p>Expert strategies for examination success</p>
                <button className="resource-button">Learn More</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Articles;
