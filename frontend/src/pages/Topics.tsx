import React from 'react';
import '../styles/Topics.css';

const Topics: React.FC = () => {
  const topics = [
    {
      id: '1',
      title: 'Criminal Law and Jurisprudence',
      description: 'Comprehensive coverage of criminal law principles, jurisprudence, and case studies relevant to the CLE examination.',
      duration: '40 hours',
      materials: ['TOS-based modules', 'Case studies', 'Practice questions'],
      difficulty: 'Advanced' as const
    },
    {
      id: '2',
      title: 'Law Enforcement Administration',
      description: 'Organizational structure, management principles, and administrative procedures in law enforcement agencies.',
      duration: '35 hours',
      materials: ['Administrative manuals', 'Case scenarios', 'Mock examinations'],
      difficulty: 'Intermediate' as const
    },
    {
      id: '3',
      title: 'Criminalistics',
      description: 'Scientific investigation techniques, forensic science principles, and evidence analysis methods.',
      duration: '30 hours',
      materials: ['Laboratory exercises', 'Forensic case studies', 'Technical manuals'],
      difficulty: 'Advanced' as const
    },
    {
      id: '4',
      title: 'Criminal Investigation and Detection',
      description: 'Investigation procedures, detection techniques, and case-solving methodologies.',
      duration: '35 hours',
      materials: ['Investigation protocols', 'Case studies', 'Practical exercises'],
      difficulty: 'Intermediate' as const
    },
    {
      id: '5',
      title: 'Criminal Justice System',
      description: 'Overview of the Philippine criminal justice system, processes, and institutional relationships.',
      duration: '25 hours',
      materials: ['System diagrams', 'Process flowcharts', 'Legal frameworks'],
      difficulty: 'Beginner' as const
    },
    {
      id: '6',
      title: 'Correctional Administration',
      description: 'Prison management, rehabilitation programs, and correctional officer responsibilities.',
      duration: '30 hours',
      materials: ['Administrative guidelines', 'Program manuals', 'Case studies'],
      difficulty: 'Intermediate' as const
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'green';
      case 'Intermediate': return 'orange';
      case 'Advanced': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="topics">
      <section className="topics-hero">
        <div className="container">
          <h1>CLE Review Topics</h1>
          <p className="hero-subtitle">Comprehensive coverage of all subjects in the Criminologist Licensure Examination</p>
        </div>
      </section>

      <section className="topics-overview">
        <div className="container">
          <div className="overview-stats">
            <div className="stat-item">
              <h3>6</h3>
              <p>Major Subjects</p>
            </div>
            <div className="stat-item">
              <h3>195</h3>
              <p>Total Hours</p>
            </div>
            <div className="stat-item">
              <h3>100%</h3>
              <p>TOS Coverage</p>
            </div>
          </div>
        </div>
      </section>

      <section className="topics-content">
        <div className="container">
          <h2>Subject Areas</h2>
          <div className="topics-grid">
            {topics.map((topic) => (
              <div key={topic.id} className="topic-card">
                <div className="topic-header">
                  <h3>{topic.title}</h3>
                  <span className={`difficulty-badge ${getDifficultyColor(topic.difficulty)}`}>
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
                      {topic.materials.map((material, index) => (
                        <li key={index}>{material}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button className="topic-cta">View Details</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="study-approach">
        <div className="container">
          <h2>Our Study Approach</h2>
          <div className="approach-grid">
            <div className="approach-item">
              <div className="approach-icon">📚</div>
              <h3>TOS-Based Learning</h3>
              <p>All materials are aligned with the official Table of Specifications to ensure comprehensive coverage of exam topics.</p>
            </div>
            <div className="approach-item">
              <div className="approach-icon">🎯</div>
              <h3>Mock Examinations</h3>
              <p>Regular practice tests simulate actual board exam conditions to build confidence and test-taking skills.</p>
            </div>
            <div className="approach-item">
              <div className="approach-icon">👥</div>
              <h3>Interactive Learning</h3>
              <p>Combination of online and face-to-face sessions ensures flexible and comprehensive learning experience.</p>
            </div>
            <div className="approach-item">
              <div className="approach-icon">📊</div>
              <h3>Progress Tracking</h3>
              <p>Regular assessments and feedback help monitor progress and identify areas for improvement.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="schedule-info">
        <div className="container">
          <h2>Review Schedule</h2>
          <div className="schedule-card">
            <h3>Hybrid Learning Format</h3>
            <div className="schedule-details">
              <div className="schedule-item">
                <div className="day-type">Online Sessions</div>
                <div className="day-count">3 Days per Week</div>
                <div className="day-description">Interactive online classes with live instructors</div>
              </div>
              <div className="schedule-item">
                <div className="day-type">Face-to-Face Sessions</div>
                <div className="day-count">3 Days per Week</div>
                <div className="day-description">In-person coaching and practical exercises</div>
              </div>
            </div>
            <div className="schedule-note">
              <p><strong>Note:</strong> Schedule may be adjusted based on student needs and exam timeline.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Topics;