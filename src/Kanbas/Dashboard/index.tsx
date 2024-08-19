// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import * as db from "../Database";
// export default function Dashboard(
//   { courses, course, setCourse, addNewCourse,
//     deleteCourse, updateCourse }: {
//       courses: any[]; course: any; setCourse: (course: any) => void;
//       addNewCourse: () => void; deleteCourse: (course: any) => void;
//       updateCourse: () => void;
//     }
// ) {

//   return (
//     <div id="wd-dashboard">
//       <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
//       <h5>New Course
//         <button className="btn btn-primary float-end"
//           id="wd-add-new-course-click"
//           onClick={addNewCourse} > Add </button>
//         <button className="btn btn-warning float-end me-2"
//           onClick={updateCourse} id="wd-update-course-click">
//           Update
//         </button>
//       </h5>
//       <br />
//       <input value={course.name} className="form-control mb-2"
//         onChange={(e) => setCourse({ ...course, name: e.target.value })} />
//       <textarea value={course.description} className="form-control"
//         onChange={(e) => setCourse({ ...course, description: e.target.value })} />
//       <hr />

//       <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
//       <div id="wd-dashboard-courses" className="row">
//         <div className="row row-cols-1 row-cols-md-5 g-4">
//           {courses.map((course) => (
//             <div className="wd-dashboard-course col" style={{ width: "300px" }}>
//               <Link to={`/Kanbas/Courses/${course._id}/Home`} className="text-decoration-none" >
//                 <div className="card rounded-3 overflow-hidden">
//                   <img src="/images/reactjs.jpg" height="{160}" />
//                   <div className="card-body">
//                     <span className="wd-dashboard-course-link"
//                       style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }} >
//                       {course.name}
//                     </span>
//                     <p className="wd-dashboard-course-title card-text" style={{ maxHeight: 53, overflow: "hidden" }}>
//                       {course.description}
//                     </p>
//                     <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">Go</Link>

//                     <button onClick={(event) => {
//                       event.preventDefault();
//                       deleteCourse(course._id);
//                     }} className="btn btn-danger float-end"
//                       id="wd-delete-course-click">
//                       Delete
//                     </button>
//                     <button id="wd-edit-course-click"
//                       onClick={(event) => {
//                         event.preventDefault();
//                         setCourse(course);
//                       }}
//                       className="btn btn-warning me-2 float-end" >
//                       Edit
//                     </button>

//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  enrollUserInCourse
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: (userId: string) => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: (course: any) => void;
  enrollUserInCourse: (courseId: string, userId: string) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);

  useEffect(() => {
    const initialEnrolledCourses = courses.filter(course =>
      course.enrolled && Array.isArray(course.enrolled) && course.enrolled.includes(currentUser._id)
    );
    setEnrolledCourses(initialEnrolledCourses);
  }, [courses, currentUser._id]);

  const handleEnroll = (courseId: string) => {
    enrollUserInCourse(courseId, currentUser._id);
    const enrolledCourse = courses.find(course => course._id === courseId);
    if (enrolledCourse && !enrolledCourses.includes(enrolledCourse)) {
      setEnrolledCourses([...enrolledCourses, enrolledCourse]);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.enrolled && Array.isArray(course.enrolled) && course.enrolled.includes(currentUser._id)
  );

  return (
    <div id='wd-dashboard'>
      <h1 id='wd-dashboard-title'>Dashboard</h1>
      <hr />

      {currentUser.role === 'STUDENT' && (
        <>
          <h2 id='wd-dashboard-selectcourses'>
            You can enroll in the below courses
          </h2>
          <br />
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course._id}>
                  <td>{course.name}</td>
                  <td>
                    <button
                      className='btn btn-warning'
                      onClick={() => handleEnroll(course._id)}
                      id='wd-enroll-course-click'
                    >
                      Enroll
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2 id='wd-dashboard-enrolled'>
            Enrolled Courses ({enrolledCourses.length})
          </h2>
          <div className='row row-cols-1 row-cols-md-3 g-4'>
            {enrolledCourses.map(course => (
              <div key={course._id} className='col'>
                <Link to={`/Kanbas/Courses/${course._id ? course._id : 'RS101'}/Home`} className='btn btn-primary w-100'>
                  {course.name}
                </Link>
              </div>
            ))}
          </div>
          <hr />
        </>
      )}

      {currentUser.role === 'FACULTY' && (
        <>
          <h5>
            New Course
            <button
              className='btn btn-primary float-end'
              id='wd-add-new-course-click'
              onClick={() => addNewCourse(currentUser._id)}
            >
              Add
            </button>
            <button
              className='btn btn-warning float-end me-2'
              onClick={() => updateCourse(course)}
              id='wd-update-course-click'
            >
              Update
            </button>
          </h5>
          <br />
          <input
            value={course.name}
            className='form-control mb-2'
            onChange={e => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            className='form-control'
            onChange={e =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
          <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
          <div id="wd-dashboard-courses" className="row">
            <div className="row row-cols-1 row-cols-md-5 g-4">
              {courses.map((course) => (
                <div className="wd-dashboard-course col" style={{ width: "300px" }} key={course._id}>
                  <Link to={`/Kanbas/Courses/${course._id}/Home`} className="text-decoration-none">
                    <div className="card rounded-3 overflow-hidden">
                      <img src="/images/reactjs.jpg" height="160" alt={course.name} />
                      <div className="card-body">
                        <span className="wd-dashboard-course-link"
                          style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                          {course.name}
                        </span>
                        <p className="wd-dashboard-course-title card-text" style={{ maxHeight: 53, overflow: "hidden" }}>
                          {course.description}
                        </p>
                        <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">Go</Link>
                        <button onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course._id);
                        }} className="btn btn-danger float-end" id="wd-delete-course-click">
                          Delete
                        </button>
                        <button id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }} className="btn btn-warning me-2 float-end">
                          Edit
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
