import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './QuizDetails.css'; // 样式文件

export default function QuizDetails() {
  const navigate = useNavigate();
  const { quizId } = useParams(); // 从路由参数获取quizId
  const quiz = useSelector((state: any) =>
    state.quizzesReducer.quizzes.find((quiz: any) => quiz._id === quizId)
  );
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const userRole = currentUser.role;

  if (!quiz) {
    return <p>Quiz not found</p>;
  }

  const handlePreview = () => {
    navigate(`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}/preview`);
  };

  const handleEdit = () => {
    navigate(`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}/editor`);
  };

  return (
    <div className="quiz-details-container">
      <div className="quiz-header">
        <h2>{quiz.title}</h2>
        {userRole === 'FACULTY' ? (
          <div>
            <button onClick={handlePreview} className="btn btn-light me-2">
              Preview
            </button>
            <button onClick={handleEdit} className="btn btn-primary">
              Edit
            </button>
          </div>
        ) : (
          <button className="btn btn-success">Start Quiz</button>
        )}
      </div>
      <div className="quiz-details">
        <div className="quiz-property">
          <strong>Quiz Type:</strong> {quiz.quizType || 'Graded Quiz'}
        </div>
        <div className="quiz-property">
          <strong>Points:</strong> {quiz.points}
        </div>
        <div className="quiz-property">
          <strong>Assignment Group:</strong> {quiz.assignmentGroup || 'Quizzes'}
        </div>
        <div className="quiz-property">
          <strong>Shuffle Answers:</strong> {quiz.shuffleAnswers ? 'Yes' : 'No'}
        </div>
        <div className="quiz-property">
          <strong>Time Limit:</strong> {quiz.timeLimit || '20 Minutes'}
        </div>
        <div className="quiz-property">
          <strong>Multiple Attempts:</strong> {quiz.multipleAttempts ? 'Yes' : 'No'}
        </div>
        {quiz.multipleAttempts && (
          <div className="quiz-property">
            <strong>How Many Attempts:</strong> {quiz.attempts || '1'}
          </div>
        )}
        <div className="quiz-property">
          <strong>Show Correct Answers:</strong> {quiz.showCorrectAnswers || 'Immediately'}
        </div>
        <div className="quiz-property">
          <strong>Access Code:</strong> {quiz.accessCode || 'None'}
        </div>
        <div className="quiz-property">
          <strong>One Question at a Time:</strong> {quiz.oneQuestionAtATime ? 'Yes' : 'No'}
        </div>
        <div className="quiz-property">
          <strong>Webcam Required:</strong> {quiz.webcamRequired ? 'Yes' : 'No'}
        </div>
        <div className="quiz-property">
          <strong>Lock Questions After Answering:</strong> {quiz.lockQuestionsAfterAnswering ? 'Yes' : 'No'}
        </div>
        <div className="quiz-dates">
          <div className="quiz-date">
            <strong>Due Date:</strong> {new Date(quiz.dueDate).toLocaleString()}
          </div>
          <div className="quiz-date">
            <strong>Available From:</strong> {new Date(quiz.availableDate).toLocaleString()}
          </div>
          <div className="quiz-date">
            <strong>Until:</strong> {new Date(quiz.untilDate).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
