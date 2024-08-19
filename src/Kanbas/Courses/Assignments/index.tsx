import 'bootstrap/dist/css/bootstrap.min.css';
import { BsGripVertical, BsPlus } from 'react-icons/bs';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { TfiAgenda } from "react-icons/tfi";
import LessonControlButtons from '../Modules/LessonControlButtons';
import ModuleControlButtons from '../Modules/ModuleControlButtons';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { IoEllipsisVertical } from 'react-icons/io5';
import { useDispatch, useSelector } from "react-redux";
import AssignmentsControls from "./AssignmentsControls";
import { setAssignments, addAssignment, editAssignment, updateAssignment, deleteAssignment } from "./reducer";
import * as db from "../../Database";
import { useState, useEffect } from "react";
import * as client from "./client";


interface Assignment {
  _id: string;
  title: string;
  description: string;
  points: string;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
  course: string;
  editing?: boolean;
}

export default function Assignments() {
  const { cid } = useParams<{ cid?: string }>();
  const courseId = cid || ''; // Provide a fallback value

  const [assignment, setAssignment] = useState<Assignment>({
    _id: '',
    title: "",
    description: "",
    points: "",
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
    course: courseId,
  });

  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();

  const removeAssignment = async (assignmentId: string) => {
    await client.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };


  const createAssignment = async (assignment: any) => {
    const newAssignment = await client.createAssignment(cid as string, assignment);
    dispatch(addAssignment(newAssignment));
  };


  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);


  const saveAssignment = async (assignment: any) => {
    try {
        console.log('Attempting to save assignment:', assignment); // Log assignment details
        const updatedAssignment = await client.updateAssignment(assignment);
        console.log('Assignment successfully updated:', updatedAssignment); // Log success

        dispatch(updateAssignment(updatedAssignment));
        setAssignment({
            _id: '',
            title: "",
            description: "",
            points: "",
            dueDate: "",
            availableFrom: "",
            availableUntil: "",
            course: courseId,
        });
    } catch (error: any) {
        console.error('Error saving assignment:', error.response ? error.response.data : error.message);
        alert('Failed to save assignment. Please try again.');
    }
};


  

  return (
    <div className="container" >
      <div className="row justify-content-end">
        <div className="col-md-12">
          <div id="wd-assignments" className="p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="input-group" style={{ width: '50%' }}>
                <span className="input-group-text bg-white border-end-0">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search for Assignments"
                />
              </div>
              <div className="d-flex align-items-center">
                <button className="btn btn-outline-secondary me-2">
                  <FaPlus /> Group
                </button>
                <AssignmentsControls
                  assignment={assignment}
                  setAssignment={setAssignment}
                  saveAssignment={() => saveAssignment(assignment)}
                />
              </div>
            </div>

            <ul id="wd-modules" className="list-group rounded-0">
              <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-light d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" />
                    <span className="fw-bold">ASSIGNMENTS</span>
                  </div>
                  <span className="badge bg-light text-dark border border-dark rounded-pill ms-auto me-2 px-3 py-1">40% of Total</span>
                  <BsPlus className="fs-2" />
                  <IoEllipsisVertical className="fs-4" />
                </div>
                <ul className="wd-lessons list-group rounded-0">
                  {assignments
                    .filter((assignment: Assignment) => assignment.course === courseId)
                    .map((assignment: Assignment) => (
                      <li key={assignment._id} className="wd-lesson list-group-item p-0 border-0 border-start border-success border-3 mb-0">
                        <div className="d-flex align-items-center p-3 ps-1">
                          <BsGripVertical className="me-2 fs-3" />
                          <TfiAgenda className="me-2 fs-3" />
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-center">
                              <Link
                                id={`wd-${assignment._id}-link`}
                                to={`/Kanbas/courses/${courseId}/Assignments/${assignment._id}`}
                                className="btn btn-link p-0 fw-bold text-decoration-none"
                              >
                                {assignment.title}
                              </Link>
                              {!assignment.editing }
                              {assignment.editing && (
                                <input
                                  className="form-control w-50 d-inline-block"
                                  onChange={(e) => dispatch(
                                    updateAssignment({ ...assignment, title: e.target.value })
                                  )}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      updateAssignment({ ...assignment, editing: false });
                                    }
                                  }}
                                  value={assignment.title}
                                />
                              )}
                              <ModuleControlButtons
                                moduleId={assignment._id}
                                deleteModule={(assignmentId) => {
                                  removeAssignment(assignmentId);
                                }}
                                editModule={(assignmentId) => dispatch(editAssignment(assignmentId))}
                              />
                            </div>
                            <p className="mb-0">
                              <span className="text-danger">Multiple Modules</span> | Not available until May 6 at 12:00am | Due May 13 at 11:59pm | 100pts
                            </p>
                          </div>
                        </div>
                        <hr className="m-0" />
                      </li>
                    ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
