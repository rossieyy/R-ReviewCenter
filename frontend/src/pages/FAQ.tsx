import React, { useState } from 'react';
import '../styles/FAQ.css';

const FAQ: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const faqs = [
    {
      id: '1',
      category: 'Registration',
      question: 'How do I register for the February 2027 CLE review program?',
      answer: 'You can register online through our website or visit our center at 307 Col. Salazar St., Signal Village, Taguig. You only need to pay ₱1,000 as down payment to secure your slot, with the remaining balance payable before the review starts.'
    },
    {
      id: '2',
      category: 'Registration',
      question: 'What is the registration deadline?',
      answer: 'Registration is ongoing, but slots are limited. We recommend registering as early as possible to secure your spot. The final registration deadline is typically 2 weeks before the review program begins.'
    },
    {
      id: '3',
      category: 'Payment',
      question: 'What are the payment options available?',
      answer: 'We accept cash payments at our center, bank transfers, and GCash. The promo fee is ₱10,000 (down from ₱13,000) with only ₱1,000 required as down payment to reserve your slot.'
    },
    {
      id: '4',
      category: 'Payment',
      question: 'Is the ₱1,000 down payment refundable?',
      answer: 'The down payment is non-refundable once paid, as it secures your slot in the program. However, it will be deducted from your total review fee.'
    },
    {
      id: '5',
      category: 'Program',
      question: 'What does the review program include?',
      answer: 'Your review fee includes: FREE Review T-Shirt, Test Papers, Answer Sheets, Weekly Mock Board Examinations, Board Examination Simulation, TOS-Based Books, Logbook and Ballpen, Online Review, Face-to-Face Final Coaching, and Quick Refresh Sessions.'
    },
    {
      id: '6',
      category: 'Program',
      question: 'How many days per week is the review?',
      answer: 'We offer a hybrid format with 3 days online review and 3 days face-to-face review every week. This provides flexibility while ensuring comprehensive coverage of all subjects.'
    },
    {
      id: '7',
      category: 'Schedule',
      question: 'What time do classes start and end?',
      answer: 'Online sessions typically run from 7:00 PM to 10:00 PM on weekdays. Face-to-face sessions are usually scheduled on weekends from 8:00 AM to 5:00 PM. Specific schedules will be provided upon enrollment.'
    },
    {
      id: '8',
      category: 'Schedule',
      question: 'Can I attend if I have a full-time job?',
      answer: 'Yes! Our program is designed for working professionals. With evening online sessions and weekend face-to-face classes, you can maintain your job while preparing for the CLE.'
    },
    {
      id: '9',
      category: 'Materials',
      question: 'Are the review materials updated for the 2027 CLE?',
      answer: 'Absolutely! All our materials are based on the latest Table of Specifications (TOS) and include recent updates in criminal law, jurisprudence, and examination format changes.'
    },
    {
      id: '10',
      category: 'Materials',
      question: 'Do I need to buy additional books or materials?',
      answer: 'No additional purchases are required. All necessary materials including TOS-based books, test papers, answer sheets, and other resources are included in your review fee.'
    },
    {
      id: '11',
      category: 'Location',
      question: 'Where is the review center located?',
      answer: 'Rosarian Review Center is located at 307 Col. Salazar St., Corner Col. Rongo, Central Signal Village (Signal Village), Taguig. We are easily accessible by public transportation.'
    },
    {
      id: '12',
      category: 'Location',
      question: 'Is parking available at the center?',
      answer: 'Yes, we have limited parking spaces available for students. We also recommend using public transportation as the center is accessible via jeepney and bus routes.'
    },
    {
      id: '13',
      category: 'Exam',
      question: 'What is the expected pass rate for February 2027 CLE?',
      answer: 'While pass rates depend on individual preparation and the Professional Regulation Commission, our review center has historically maintained a high success rate of over 90% among our students.'
    },
    {
      id: '14',
      category: 'Exam',
      question: 'Do you provide exam simulation sessions?',
      answer: 'Yes! We conduct regular mock board examinations and a comprehensive board examination simulation with detailed rationalization to help you prepare for the actual exam conditions.'
    },
    {
      id: '15',
      category: 'Support',
      question: 'Is there support available during the review period?',
      answer: 'Yes, our instructors are available for consultation during and after class hours. We also have online support through our Facebook page and contact number for any questions or concerns.'
    }
  ];

  const categories = ['All', 'Registration', 'Payment', 'Program', 'Schedule', 'Materials', 'Location', 'Exam', 'Support'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFAQs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="faq">
      <section className="faq-hero">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p className="hero-subtitle">
            Find answers to common questions about our CLE review program
          </p>
        </div>
      </section>

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

      <section className="faq-filter">
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

      <section className="faq-content">
        <div className="container">
          <div className="faq-list">
            {filteredFAQs.map((faq) => (
              <div key={faq.id} className="faq-item">
                <button 
                  className="faq-question"
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <span className="question-text">{faq.question}</span>
                  <span className={`faq-icon ${activeId === faq.id ? 'active' : ''}`}>
                    {activeId === faq.id ? '−' : '+'}
                  </span>
                </button>
                {activeId === faq.id && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                    <span className="faq-category">Category: {faq.category}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-support">
        <div className="container">
          <div className="support-card">
            <h2>Still have questions?</h2>
            <p>Can't find the answer you're looking for? Our support team is here to help!</p>
            <div className="contact-options">
              <div className="contact-option">
                <div className="contact-icon">📞</div>
                <div className="contact-info">
                  <h3>Call Us</h3>
                  <p>0926-024-5057</p>
                  <small>Mon-Fri: 8AM-6PM, Sat: 8AM-4PM</small>
                </div>
              </div>
              <div className="contact-option">
                <div className="contact-icon">📍</div>
                <div className="contact-info">
                  <h3>Visit Us</h3>
                  <p>307 Col. Salazar St., Signal Village, Taguig</p>
                  <small>Walk-ins welcome during office hours</small>
                </div>
              </div>
              <div className="contact-option">
                <div className="contact-icon">💬</div>
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

      <section className="helpful-resources">
        <div className="container">
          <h2>Helpful Resources</h2>
          <div className="resources-grid">
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
  );
};

export default FAQ;