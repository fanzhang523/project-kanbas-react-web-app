import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsGripVertical } from 'react-icons/bs';
import { FaSearch, FaPlus } from 'react-icons/fa';
import LessonControlButtons from '../Modules/LessonControlButtons';
import ModuleControlButtons from '../Modules/ModuleControlButtons';
import { TfiAgenda } from "react-icons/tfi";
import { Link } from 'react-router-dom';

export default function Assignments() {
    return (
        
        <div className="container" style={{ marginTop: '-260px', marginRight: '-120px'}}>
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
                            <div>
                                <button className="btn btn-outline-secondary me-2">
                                    <FaPlus /> Group
                                </button>
                                <button className="btn btn-danger">
                                    <FaPlus /> Assignment
                                </button>
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
                                    <ModuleControlButtons />
                                </div>
                                <ul className="wd-lessons list-group rounded-0">
                                    <li className="wd-lesson list-group-item p-0 border-0 border-start border-success border-3 mb-0">
                                        <div className="d-flex align-items-center p-3 ps-1">
                                            <TfiAgenda className="me-2 fs-3" />
                                            <div className="flex-grow-1">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <a id="wd-a1-link" href="#/Kanbas/Courses/1234/Assignments/a1"
                                                        className="btn btn-link p-0 fw-bold text-decoration-none"> A1 </a>
                                                </div>
                                                <p className="mb-0">
                                                    <span className="text-danger">Multiple Modules</span> | Not Available until May 6 at 12:00am | Due May 13 at 11:59pm | 100 pts
                                                </p>
                                            </div>
                                        </div>
                                        <hr className="m-0" />
                                    </li>
                                    <li className="wd-lesson list-group-item p-0 border-0 border-start border-success border-3 mb-0">
                                        <div className="d-flex align-items-center p-3 ps-1">
                                            <TfiAgenda className="me-2 fs-3" />
                                            <div className="flex-grow-1">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <button className="btn btn-link p-0 fw-bold text-decoration-none">A2</button>
                                                    <LessonControlButtons />
                                                </div>
                                                <p className="mb-0">
                                                    <span className="text-danger">Multiple Modules</span> | Not Available until May 13 at 12:00am | Due May 20 at 11:59pm | 100 pts
                                                </p>
                                            </div>
                                        </div>
                                        <hr className="m-0" />
                                    </li>
                                    <li className="wd-lesson list-group-item p-0 border-0 border-start border-success border-3 mb-0">
                                        <div className="d-flex align-items-center p-3 ps-1">
                                            <TfiAgenda className="me-2 fs-3" />
                                            <div className="flex-grow-1">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <button className="btn btn-link p-0 fw-bold text-decoration-none">A3</button>
                                                    <LessonControlButtons />
                                                </div>
                                                <p className="mb-0">
                                                    <span className="text-danger">Multiple Modules</span> | Not Available until May 25 at 12:00am | Due May 30 at 11:59pm | 100 pts
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
    );
}
