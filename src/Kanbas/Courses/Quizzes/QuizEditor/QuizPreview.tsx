import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function QuizPreview() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const quiz = useSelector((state: any) =>
    state.quizzesReducer.quizzes.find((quiz: any) => quiz._id === quizId)
  );
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const savedAnswers = quiz.savedAnswers || {};
    setAnswers(savedAnswers);
    if (Object.keys(savedAnswers).length > 0) {
      setSubmitted(true);
      calculateScore(savedAnswers);
    }
  }, [quiz]);

  if (!quiz) {
    return <p>Quiz not found</p>;
  }

  const handleAnswerChange = (questionId: string, value: any) => {
    if (submitted) return; 

    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  const calculateScore = (currentAnswers: { [key: string]: any }) => {
    let totalScore = 0;
    quiz.questions.forEach((question: any) => {
      const userAnswer = currentAnswers[question._id];
      if (question.type === 'True/False' || question.type === 'Multiple Choice') {
        const correctAnswer = question.correctAnswer;
        if (userAnswer === correctAnswer) {
          totalScore += question.points;
        }
      }
    });
    setScore(totalScore);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    calculateScore(answers);
    // saveAnswersToDatabase(quizId, currentUser._id, answers);
  };

  const handleEditQuiz = () => {
    navigate(`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}/editor`);
  };

  return (
    <div className="quiz-preview-container">
      <h2>{quiz.title}</h2>
      <p><strong>Quiz Instructions:</strong> {quiz.instructions}</p>
      {quiz.questions.map((question: any, index: number) => (
        <div key={index} className="quiz-question-item mb-4">
          <h4>Question {index + 1}</h4>
          <p>{question.content}</p>
          <div>
            {question.type === 'True/False' && (
              <div>
                <label>
                  <input
                    type="radio"
                    name={`question-${question._id}`}
                    value="true"
                    checked={answers[question._id] === true}
                    onChange={() => handleAnswerChange(question._id, true)}
                    disabled={submitted}
                  />
                  True
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    name={`question-${question._id}`}
                    value="false"
                    checked={answers[question._id] === false}
                    onChange={() => handleAnswerChange(question._id, false)}
                    disabled={submitted}
                  />
                  False
                </label>
              </div>
            )}

            {question.type === 'Multiple Choice' && (
              <div>
                {question.choices.map((choice: any, choiceIndex: number) => (
                  <label key={choiceIndex}>
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={choice.text}
                      checked={answers[question._id] === choice.text}
                      onChange={() => handleAnswerChange(question._id, choice.text)}
                      disabled={submitted}
                    />
                    {choice.text}
                  </label>
                ))}
              </div>
            )}

            {}
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-between align-items-center mt-4">
        <button onClick={handleEditQuiz} className="btn btn-secondary">
          Keep Editing This Quiz
        </button>

        {submitted ? (
          <span className="me-4">
            <strong>Score:</strong> {score} pts
          </span>
        ) : (
          <button onClick={handleSubmit} className="btn btn-success">
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}
