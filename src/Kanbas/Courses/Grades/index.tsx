import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUpload, FaDownload } from 'react-icons/fa';
import { DiAptana } from "react-icons/di";
import { CiFilter } from "react-icons/ci";
import * as db from "../../Database";
import { useParams } from "react-router";

export default function Grades() {
  const { cid } = useParams();
  const enrollments = db.enrollments.filter(enrollment => enrollment.course === cid);
  const assignments = db.assignments.filter(assignment => assignment.course === cid);
  const grades = db.grades;
  const users = db.users;

  const getGrade = (studentId: string, assignmentId: string): string => {
    const grade = grades.find(g => g.student === studentId && g.assignment === assignmentId);
    return grade ? grade.grade : 'N/A';
  };

  const getUserName = (userId: string): string => {
    const user = users.find(u => u.loginId === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown User';
  };

  return (
    <div className="container" style={{ maxWidth: '900px', marginTop: '-280px', marginLeft: '200px' }}>
      <div className="d-flex justify-content-end align-items-center mb-3">
        <div className="d-flex">
          <button className="btn btn-outline-secondary me-2">
            <FaUpload /> Import
          </button>
          <div className="btn-group">
            <button className="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
              <FaDownload /> Export
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Export as CSV</a></li>
              <li><a className="dropdown-item" href="#">Export as Excel</a></li>
            </ul>
          </div>
          <button className="btn btn-outline-secondary ms-2">
            <DiAptana />
          </button>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6 mb-3">
          <label htmlFor="studentNames" className="form-label" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            Student Names
          </label>
          <input
            type="text"
            id="studentNames"
            className="form-control"
            placeholder="Search for Student Names"
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="assignmentNames" className="form-label" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            Assignment Names
          </label>
          <input
            type="text"
            id="assignmentNames"
            className="form-control"
            placeholder="Search for Assignment Names"
          />
        </div>
      </div>
      <div className="d-flex justify-content-start mb-3">
        <button className="btn btn-outline-secondary" style={{ backgroundColor: '#f0f0f0', color: 'black' }}>
          <CiFilter /> Apply Filters
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Student Name</th>
              {assignments.map(assignment => (
                <th key={assignment._id}>{assignment.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {enrollments.map(enrollment => (
              <tr key={enrollment._id}>
                <td>{getUserName(enrollment.user)}</td>
                {assignments.map(assignment => (
                  <td key={assignment._id}>{getGrade(enrollment.user, assignment._id)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
