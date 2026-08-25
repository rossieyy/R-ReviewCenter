import React from 'react';
import '../styles/Articles.css';

const Articles: React.FC = () => {
  const articles = [
    {
      id: '1',
      title: 'Top 10 Study Tips for CLE Success',
      summary: 'Proven strategies to help you pass the Criminologist Licensure Examination on your first attempt.',
      author: 'Prof. Maria Santos',
      publishDate: new Date('2026-08-20'),
      category: 'Study Tips',
      tags: ['study methods', 'exam preparation', 'CLE'],
      readTime: '5 min read'
    },
    {
      id: '2',
      title: 'Understanding the New CLE Format for 2027',
      summary: 'Comprehensive guide to the updated examination format and what candidates need to know.',
      author: 'Dr. Juan Dela Cruz',
      publishDate: new Date('2026-08-18'),
      category: 'Exam Updates',
      tags: ['CLE 2027', 'exam format', 'updates'],
      readTime: '8 min read'
    },
    {
      id: '3',
      title: 'Career Opportunities for Licensed Criminologists',
      summary: 'Explore the various career paths available for newly licensed criminology professionals.',
      author: 'Atty. Rosa Garcia',
      publishDate: new Date('2026-08-15'),
      category: 'Career Guide',
      tags: ['career', 'opportunities', 'criminology'],
      readTime: '10 min read'
    },
    {
      id: '4',
      title: 'Managing Exam Anxiety: A Student\'s Guide',
      summary: 'Practical techniques to overcome test anxiety and perform your best on examination day.',
      author: 'Dr. Patricia Reyes',
      publishDate: new Date('2026-08-12'),
      category: 'Mental Health',
      tags: ['anxiety', 'mental health', 'exam prep'],
      readTime: '6 min read'
    },
    {
      id: '5',
      title: 'Criminal Law Updates: Recent Jurisprudence',
      summary: 'Stay updated with the latest Supreme Court decisions relevant to the CLE examination.',
      author: 'Judge Carlos Martinez',
      publishDate: new Date('2026-08-10'),
      category: 'Legal Updates',
      tags: ['criminal law', 'jurisprudence', 'updates'],
      readTime: '12 min read'
    },
    {
      id: '6',
      title: 'Effective Note-Taking Strategies for Review',
      summary: 'Learn how to create comprehensive notes that will serve you well during review and examination.',
      author: 'Prof. Ana Gonzales',
      publishDate: new Date('2026-08-08'),
      category: 'Study Tips',
      tags: ['note-taking', 'study methods', 'organization'],
      readTime: '7 min read'
    }
  ];

  const categories = ['All', 'Study Tips', 'Exam Updates', 'Career Guide', 'Mental Health', 'Legal Updates'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredArticles = selectedCategory === 'All' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="articles">
      <section className="articles-hero">
        <div className="container">
          <h1>Articles & Resources</h1>
          <p className="hero-subtitle">
            Stay informed with our latest articles, study guides, and expert insights for CLE success
          </p>
        </div>
      </section>

      <section className="articles-filter">
        <div className="container">
          <div className="filter-tabs">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-tab ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="articles-content">
        <div className="container">
          <div className="articles-grid">
            {filteredArticles.map((article) => (
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
                <button className="article-read-more">Read Full Article</button>
              </article>
            ))}
          </div>
        </div>
      </section>

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

      <section className="featured-resources">
        <div className="container">
          <h2>Featured Resources</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <div className="resource-icon">📚</div>
              <h3>Study Guides</h3>
              <p>Comprehensive guides covering all CLE subjects</p>
              <button className="resource-button">Download PDF</button>
            </div>
            <div className="resource-card">
              <div className="resource-icon">🎯</div>
              <h3>Practice Tests</h3>
              <p>Mock examinations to test your knowledge</p>
              <button className="resource-button">Take Test</button>
            </div>
            <div className="resource-card">
              <div className="resource-icon">📹</div>
              <h3>Video Lectures</h3>
              <p>Recorded sessions from expert instructors</p>
              <button className="resource-button">Watch Now</button>
            </div>
            <div className="resource-card">
              <div className="resource-icon">💡</div>
              <h3>Exam Tips</h3>
              <p>Expert strategies for examination success</p>
              <button className="resource-button">Learn More</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Articles;