import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { setQuizzes, addQuizzes, deleteQuizzes, updateQuizzes } from './reducer';
import quizzesData from '../../Database/quizzes.json';
import { FaSearch, FaEllipsisV, FaPlus, FaTrash, FaCheckCircle, FaCopy, FaSort } from 'react-icons/fa';
import { MdOutlineModeEditOutline } from 'react-icons/md';

export default function QuizDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const userRole = currentUser.role;
  const [quizzes, setQuizzesState] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [showPopup, setShowPopup] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    setQuizzesState(quizzesData);
    dispatch(setQuizzes(quizzesData));
  }, [dispatch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleAddQuiz = async () => {
    const newQuiz = {
      _id: `quiz${quizzes.length + 1}`,
      title: 'New Quiz',
      course: 'RS101',
      availableDate: new Date(),
      untilDate: new Date(),
      dueDate: new Date(),
      numQuestions: 0,
      points: 0,
      published: false,
    };
    dispatch(addQuizzes(newQuiz));
    setQuizzesState([...quizzes, newQuiz]);
    navigate(`/Kanbas/Courses/RS101/Quizzes/${newQuiz._id}/editor`);
  };

  const handleDeleteQuiz = async (quizId: string) => {
    dispatch(deleteQuizzes(quizId));
    setQuizzesState(quizzes.filter((quiz) => quiz._id !== quizId));
  };

  const handlePublishToggle = async (quiz: any) => {
    const updatedQuiz = { ...quiz, published: !quiz.published };
    dispatch(updateQuizzes(updatedQuiz));
    setQuizzesState(quizzes.map((q) => (q._id === quiz._id ? updatedQuiz : q)));
  };

  const togglePopup = (quizId: string) => {
    setShowPopup((prev) => ({
      ...prev,
      [quizId]: !prev[quizId],
    }));
  };

  const getAvailabilityStatus = (quiz: any) => {
    const currentDate = new Date();
    const availableFrom = new Date(quiz.availableDate);
    const untilDate = new Date(quiz.untilDate);

    if (currentDate > untilDate) {
      return 'Closed';
    } else if (currentDate >= availableFrom && currentDate <= untilDate) {
      return 'Available';
    } else {
      return `Not available until ${availableFrom.toLocaleDateString()}`;
    }
  };

  const filteredQuizzes = quizzes.filter((quiz: any) =>
    quiz.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const [activeTab, setActiveTab] = useState('details');

  return (
    

    <div id="quiz-dashboard" className="container mt-5">
      <h2>Assignment Quizzes</h2>
      
      {userRole === 'STUDENT' && (
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="input-group w-50">
            <span className="input-group-text bg-white border-end-0">
              <FaSearch />
            </span>
            <input
              id="search-quizzes"
              className="form-control border-start-0"
              placeholder="Search for Quizzes"
              value={searchInput}
              onChange={handleSearchChange}
            />
          </div>

          <button onClick={handleAddQuiz} className="btn btn-danger">
            <FaPlus className="me-1" />
            Add Quiz
          </button>
        </div>
      )}

      {filteredQuizzes.length === 0 ? (
        <p>No quizzes available at this time.</p>
      ) : (
        <table className="table table-striped" style={{ borderLeft: '4px solid green' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Course</th>
              <th>Availability</th>
              <th>Due Date</th>
              <th>Points</th>
              <th>Number of Questions</th>
              {userRole === 'STUDENT' && <th>Score</th>}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuizzes.map((quiz) => (
              <tr key={quiz._id} style={{ borderLeft: 'none' }}>
                <td>
                  <button
                    className="btn btn-link"
                    onClick={() => navigate(`/Kanbas/Courses/RS101/Quizzes/${quiz._id}`)}
                  >
                    {quiz.title}
                  </button>
                </td>
                <td>{quiz.course}</td>
                <td>{getAvailabilityStatus(quiz)}</td>
                <td>{new Date(quiz.dueDate).toLocaleDateString()}</td>
                <td>{quiz.points}</td>
                <td>{quiz.numQuestions}</td>
                {userRole === 'STUDENT' && <td>{/* Display student's last attempt score here */}</td>}
                <td>
                  <div className="dropdown">
                    <button
                      className="btn btn-light dropdown-toggle"
                      type="button"
                      onClick={() => togglePopup(quiz._id)}
                    >
                      <FaEllipsisV />
                    </button>
                    {showPopup[quiz._id] && (
                      <ul className="dropdown-menu show">
                        <li>
                          <Link to={`/Kanbas/Courses/RS101/Quizzes/${quiz._id}/editor`} className="dropdown-item">
                            <MdOutlineModeEditOutline />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <button
                            className="dropdown-item text-danger"
                            onClick={() => handleDeleteQuiz(quiz._id)}
                          >
                            <FaTrash />
                            Delete
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handlePublishToggle(quiz)}
                          >
                            {quiz.published ? (
                              <>
                                <FaCheckCircle className="me-2" />
                                Unpublish
                              </>
                            ) : (
                              <>
                                <FaCheckCircle className="me-2" />
                                Publish
                              </>
                            )}
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item">
                            <FaCopy className="me-2" />
                            Copy
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item">
                            <FaSort className="me-2" />
                            Sort
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    
  );
}
