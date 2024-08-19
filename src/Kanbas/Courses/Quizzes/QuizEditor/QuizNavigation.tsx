import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface QuizNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const QuizNavigation: React.FC<QuizNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <ul className="nav nav-tabs mb-4">
      <li className="nav-item">
        <button
          className={`nav-link ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          Details
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`nav-link ${activeTab === 'questions' ? 'active' : ''}`}
          onClick={() => setActiveTab('questions')}
        >
          Questions
        </button>
      </li>
    </ul>
  );
};

export default QuizNavigation;
