import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUpload, FaDownload } from 'react-icons/fa';
import { DiAptana } from "react-icons/di";
import { CiFilter } from "react-icons/ci";

export default function Grades() {
    return (
        <div className="container" style={{ maxWidth: '900px', marginTop: '-260px', marginRight: '-200px' }}>
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
                            <th>A1 SETUP</th>
                            <th>A2 HTML</th>
                            <th>A3 CSS</th>
                            <th>A4 BOOTSTRAP</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Jane Adams</td>
                            <td>100%</td>
                            <td>96.67%</td>
                            <td>92.18%</td>
                            <td>66.22%</td>
                        </tr>
                        <tr>
                            <td>Christina Allen</td>
                            <td>100%</td>
                            <td>100%</td>
                            <td>100%</td>
                            <td>100%</td>
                        </tr>
                        <tr>
                            <td>Samreen Ansari</td>
                            <td>100%</td>
                            <td>100%</td>
                            <td>100%</td>
                            <td>100%</td>
                        </tr>
                        <tr>
                            <td>Han Bao</td>
                            <td>100%</td>
                            <td>100%</td>
                            <td><input type="text" className="form-control" defaultValue="88.03%" /></td>
                            <td>98.99%</td>
                        </tr>
                        <tr>
                            <td>Mahi Sai Srinivas Bobbili</td>
                            <td>100%</td>
                            <td>96.67%</td>
                            <td>98.37%</td>
                            <td>100%</td>
                        </tr>
                        <tr>
                            <td>Siran Cao</td>
                            <td>100%</td>
                            <td>100%</td>
                            <td>100%</td>
                            <td>100%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
