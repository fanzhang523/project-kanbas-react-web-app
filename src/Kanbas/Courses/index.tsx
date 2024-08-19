import { Routes, Route, Navigate, useParams, useLocation } from 'react-router'
import CoursesNavigation from './Navigation'
import Modules from './Modules'
import Home from './Home'
import Grades from './Grades'
import Assignments from './Assignments'
import AssignmentEditor from './Assignments/Editor'
import { FaAlignJustify } from 'react-icons/fa6'
import PeopleTable from './People/Table'
import Quiz from './Quizzes'
import QuizDetails from './Quizzes/QuizDetails/QuizDetails'
import QuizDetailsEditor from './Quizzes/QuizEditor/QuizDetailsEditor'
import QuizQuestionsEditor from './Quizzes/QuizEditor/QuizQuestionsEditor'
import QuizNavigation from './Quizzes/QuizEditor/QuizNavigation'
import React, { useState } from 'react';
import QuizPreview from './Quizzes/QuizEditor/QuizPreview'

export default function Courses ({ courses }: { courses: any[] }) {
  const { cid, qid } = useParams()
  const course = courses.find(course => course._id === cid)
  // const quiz = course.quizzes.find((quiz: any) => quiz.id === qid)
  const { pathname } = useLocation()
  const [activeTab, setActiveTab] = useState('questions'); 
  console.log('Active tab:', activeTab);

  return (
    <div id='wd-courses'>
      <h2 className='text-danger'>
        <FaAlignJustify className='me-4 fs-4 mb-1' />
        {course && course.name} &gt; {pathname.split('/')[4]}
        {/* &gt;{' '}
        {quiz && quiz.name}{' '} */}
      </h2>

      <hr />
      <div className='d-flex'>
        <div className='d-none d-md-block'>
          <CoursesNavigation />
        </div>

        <div className='flex-fill'>
          <Routes>
            <Route path='/' element={<Navigate to='Home' />} />
            <Route path='/Home' element={<Home />} />
            <Route path='/Modules' element={<Modules />} />
            <Route path='/Piazza' element={<h1>Piazza</h1>} />
            <Route path='/Zoom' element={<h1>Zoom</h1>} />
            <Route path='/Assignments' element={<Assignments />} />
            <Route path='/Assignments/:aid' element={<AssignmentEditor />} />
            <Route path='/Quizzes' element={<Quiz />} />
            <Route path='Quizzes/:quizId' element={<QuizDetails />} />
            <Route path='/Quizzes/:qid/editor' element={<QuizDetailsEditor />} />
            <Route path='/Quizzes/:qid/questions' element={<QuizQuestionsEditor />} />
            <Route path='/Quizzes/:qid/quiznavigation'element={<QuizNavigation activeTab={activeTab} setActiveTab={setActiveTab} />}/>
            <Route path='/Quizzes/:qid/quizpreview' element={<QuizPreview />} />
            <Route path='People' element={<PeopleTable />} />
            <Route path='People/:uid' element={<PeopleTable />} />
            <Route path='/Grades' element={<Grades />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}