import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Choice {
  text: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  id: number;
  type: string;
  title: string;
  content: string;
  points: number;
  editMode: boolean;
  choices?: Choice[];
  correctAnswer?: boolean; // For True/False questions
  fillInBlankAnswers?: string[]; // For Fill in the Blanks questions
}

export default function QuizQuestionsEditor() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [newQuestionId, setNewQuestionId] = useState(1);
  const [activeTab, setActiveTab] = useState('questions');

  const addNewQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: newQuestionId,
      type: 'Multiple Choice',
      title: 'New Question',
      content: '',
      points: 1,
      editMode: true,
      choices: [{ text: '', isCorrect: false }],
      fillInBlankAnswers: [], // Initialize an empty array for Fill in the Blanks answers
    };
    setQuestions([...questions, newQuestion]);
    setNewQuestionId(newQuestionId + 1);
  };

  const handleQuestionChange = (index: number, field: keyof QuizQuestion, value: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value,
    };
    setQuestions(updatedQuestions);
  };

  const handleChoiceChange = (questionIndex: number, choiceIndex: number, field: keyof Choice, value: any) => {
    const updatedQuestions = [...questions];
    const updatedChoices = updatedQuestions[questionIndex].choices!.map((choice, i) =>
      i === choiceIndex ? { ...choice, [field]: value } : choice
    );
    updatedQuestions[questionIndex].choices = updatedChoices;
    setQuestions(updatedQuestions);
  };

  const handleFillInBlankAnswerChange = (questionIndex: number, answerIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    const updatedAnswers = updatedQuestions[questionIndex].fillInBlankAnswers!.map((answer, i) =>
      i === answerIndex ? value : answer
    );
    updatedQuestions[questionIndex].fillInBlankAnswers = updatedAnswers;
    setQuestions(updatedQuestions);
  };

  const addChoice = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].choices!.push({ text: '', isCorrect: false });
    setQuestions(updatedQuestions);
  };

  const addFillInBlankAnswer = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].fillInBlankAnswers!.push('');
    setQuestions(updatedQuestions);
  };

  const removeChoice = (questionIndex: number, choiceIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].choices = updatedQuestions[questionIndex].choices!.filter((_, i) => i !== choiceIndex);
    setQuestions(updatedQuestions);
  };

  const removeFillInBlankAnswer = (questionIndex: number, answerIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].fillInBlankAnswers = updatedQuestions[questionIndex].fillInBlankAnswers!.filter((_, i) => i !== answerIndex);
    setQuestions(updatedQuestions);
  };

  const toggleEditMode = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].editMode = !updatedQuestions[index].editMode;
    setQuestions(updatedQuestions);
  };

  const calculateTotalPoints = () => {
    return questions.reduce((total, question) => total + question.points, 0);
  };

  const handleSave = () => {
    // Implement save logic here, for example, saving to a backend or local storage
    console.log('Questions saved:', questions);
  };

  const handleCancel = () => {
    // Implement cancel logic here
    setQuestions([]);
    setNewQuestionId(1);
  };

  return (
    <div className="quiz-questions-container">
      <h2>Quiz Questions Editor</h2>

      {activeTab === 'questions' && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span>Points: {calculateTotalPoints()}</span>
          </div>

          {questions.map((question, index) => (
            <div key={question.id} className="quiz-question-item mb-4">
              {question.editMode ? (
                <div>
                  <div className="d-flex align-items-center mb-3">
                    <input
                      type="text"
                      value={question.title}
                      onChange={(e) => handleQuestionChange(index, 'title', e.target.value)}
                      className="form-control me-3"
                      placeholder="Enter question title"
                    />
                    <select
                      value={question.type}
                      onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                      className="form-control me-3"
                    >
                      <option value="Multiple Choice">Multiple Choice</option>
                      <option value="True/False">True/False</option>
                      <option value="Fill in the Blanks">Fill in the Blanks</option>
                    </select>
                    <input
                      type="number"
                      value={question.points}
                      onChange={(e) => handleQuestionChange(index, 'points', parseInt(e.target.value))}
                      className="form-control"
                      style={{ width: '80px' }}
                    />
                  </div>

                  {question.type === 'Multiple Choice' && (
                    <div>
                      <label>Question:</label>
                      <ReactQuill
                        value={question.content}
                        onChange={(content) => handleQuestionChange(index, 'content', content)}
                        modules={{
                          toolbar: [
                            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                            [{size: []}],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{'list': 'ordered'}, {'list': 'bullet'}, 
                             {'indent': '-1'}, {'indent': '+1'}],
                            ['link', 'image', 'video'],
                            ['clean']
                          ],
                        }}
                        formats={[
                          'header', 'font', 'size',
                          'bold', 'italic', 'underline', 'strike', 'blockquote',
                          'list', 'bullet', 'indent',
                          'link', 'image', 'video'
                        ]}
                        className="mb-4"
                      />

                      <h5>Choices:</h5>
                      {question.choices!.map((choice, choiceIndex) => (
                        <div key={choiceIndex} className="d-flex align-items-center mb-2">
                          <input
                            type="radio"
                            name={`correctChoice${index}`}
                            checked={choice.isCorrect}
                            onChange={() => handleChoiceChange(index, choiceIndex, 'isCorrect', true)}
                            className="me-2"
                          />
                          <input
                            type="text"
                            value={choice.text}
                            onChange={(e) => handleChoiceChange(index, choiceIndex, 'text', e.target.value)}
                            className="form-control me-2"
                            placeholder={`Possible Answer ${choiceIndex + 1}`}
                          />
                          {question.choices!.length > 1 && (
                            <button
                              onClick={() => removeChoice(index, choiceIndex)}
                              className="btn btn-danger"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button onClick={() => addChoice(index)} className="btn btn-link">
                        + Add Another Answer
                      </button>
                    </div>
                  )}

                  {question.type === 'True/False' && (
                    <div>  
                      <label>Question:</label>
                      <ReactQuill
                        value={question.content}
                        onChange={(content) => handleQuestionChange(index, 'content', content)}
                        modules={{
                          toolbar: [
                            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                            [{size: []}],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{'list': 'ordered'}, {'list': 'bullet'}, 
                             {'indent': '-1'}, {'indent': '+1'}],
                            ['link', 'image', 'video'],
                            ['clean']
                          ],
                        }}
                        formats={[
                          'header', 'font', 'size',
                          'bold', 'italic', 'underline', 'strike', 'blockquote',
                          'list', 'bullet', 'indent',
                          'link', 'image', 'video'
                        ]}
                        className="mb-4"
                      />

                      <h5>Answers:</h5>
                      <div className="d-flex flex-column mb-2">
                        <button
                          onClick={() => handleQuestionChange(index, 'correctAnswer', true)}
                          className={`btn ${question.correctAnswer === true ? 'btn-success' : 'btn-light'} me-2`}
                          style={{ textAlign: 'left' }}
                        >
                          <span className="me-2">{question.correctAnswer === true ? '✔️' : ''}</span> True
                        </button>
                        <button
                          onClick={() => handleQuestionChange(index, 'correctAnswer', false)}
                          className={`btn ${question.correctAnswer === false ? 'btn-danger' : 'btn-light'} me-2`}
                          style={{ textAlign: 'left' }}
                        >
                          <span className="me-2">{question.correctAnswer === false ? '✔️' : ''}</span> False
                        </button>
                      </div>

                      <div className="mt-3">
                        <button onClick={() => toggleEditMode(index)} className="btn btn-secondary me-2">Cancel</button>
                        <button onClick={() => toggleEditMode(index)} className="btn btn-danger">Update Question</button>
                      </div>
                    </div>
                  )}

                  {question.type === 'Fill in the Blanks' && (
                    <div>
                      <label>Question:</label>
                      <ReactQuill
                        value={question.content}
                        onChange={(content) => handleQuestionChange(index, 'content', content)}
                        modules={{
                          toolbar: [
                            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                            [{size: []}],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{'list': 'ordered'}, {'list': 'bullet'}, 
                             {'indent': '-1'}, {'indent': '+1'}],
                            ['link', 'image', 'video'],
                            ['clean']
                          ],
                        }}
                        formats={[
                          'header', 'font', 'size',
                          'bold', 'italic', 'underline', 'strike', 'blockquote',
                          'list', 'bullet', 'indent',
                          'link', 'image', 'video'
                        ]}
                        className="mb-4"
                      />

                      <h5>Answers:</h5>
                      {question.fillInBlankAnswers!.map((answer, answerIndex) => (
                        <div key={answerIndex} className="d-flex align-items-center mb-2">
                          <input
                            type="text"
                            value={answer}
                            onChange={(e) => handleFillInBlankAnswerChange(index, answerIndex, e.target.value)}
                            className="form-control me-2"
                            placeholder={`Possible Answer ${answerIndex + 1}`}
                          />
                          {question.fillInBlankAnswers!.length > 1 && (
                            <button
                              onClick={() => removeFillInBlankAnswer(index, answerIndex)}
                              className="btn btn-danger"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button onClick={() => addFillInBlankAnswer(index)} className="btn btn-link">
                        + Add Another Answer
                      </button>
                    </div>
                  )}

                  <div className="mt-3">
                    <button onClick={() => toggleEditMode(index)} className="btn btn-primary me-2">Done</button>
                  </div>
                </div>
              ) : (
                <div className="d-flex justify-content-between">
                  <div>
                    <strong>Type:</strong> {question.type} <br />
                    <strong>Title:</strong> {question.title} <br />
                    <strong>Content:</strong> {question.content} <br />
                    <strong>Points:</strong> {question.points}
                  </div>
                  <button onClick={() => toggleEditMode(index)} className="btn btn-secondary">Edit</button>
                </div>
              )}
            </div>
          ))}

          <button onClick={addNewQuestion} className="btn btn-primary">+ New Question</button>
          <div className="mt-4">
            <button onClick={handleCancel} className="btn btn-secondary me-2">Cancel</button>
            <button onClick={handleSave} className="btn btn-success">Save</button>
          </div>
        </div>
      )}
    </div>
  );
}
