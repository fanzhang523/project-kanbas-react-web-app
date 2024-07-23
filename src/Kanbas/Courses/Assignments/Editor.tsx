import React from 'react';
import { useParams, Link } from "react-router-dom";
import * as db from "../../Database";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find(a => a._id === aid);

  return (
    <div className="container" style={{ marginTop: '-280px', marginLeft: '300px' }}>
      <div className="row mb-3">
        <div className="col-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to={`/courses/${cid}`}>{cid}</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{assignment?.title ?? "Untitled Assignment"}</li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12">
          <h2>{assignment?.title ?? "Untitled Assignment"}</h2>
          <input type="text" className="form-control" value={assignment?.title ?? ""} readOnly />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12">
          <p>Description: {assignment?.description ?? "No description provided."}</p>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Points</label>
          <input type="number" className="form-control" value="100" />
        </div>
        <div className="col-md-6">
          <label className="form-label">Assignment Group</label>
          <select className="form-control">
            <option>ASSIGNMENTS</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Display Grade as</label>
          <select className="form-control">
            <option>Percentage</option>
            <option>Pass/No Pass</option>
            <option>Letter</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Submission Type</label>
          <select className="form-control">
            <option>Online</option>
            <option>In Person</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12">
          <label className="form-label">Online Entry Options</label>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="textEntry" />
            <label className="form-check-label" htmlFor="textEntry">
              Text Entry
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="websiteURL" />
            <label className="form-check-label" htmlFor="websiteURL">
              Website URL
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="mediaRecordings" />
            <label className="form-check-label" htmlFor="mediaRecordings">
              Media Recordings
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="studentAnnotation" />
            <label className="form-check-label" htmlFor="studentAnnotation">
              Student Annotation
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="fileUploads" />
            <label className="form-check-label" htmlFor="fileUploads">
              File Uploads
            </label>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Assign to</label>
          <select className="form-control">
            <option>Everyone</option>
            <option>Instructor</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Due</label>
          <input type="datetime-local" className="form-control" value="2024-05-13T23:59" />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Available from</label>
          <input type="datetime-local" className="form-control" value="2024-05-06T00:00" />
        </div>
        <div className="col-md-6">
          <label className="form-label">Until</label>
          <input type="datetime-local" className="form-control" />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Link to={`/courses/${cid}/Assignments`} className="btn btn-secondary me-2">Cancel</Link>
          <Link to={`/courses/${cid}/Assignments`} className="btn btn-danger">Save</Link>
        </div>
      </div>
    </div>
  );
}
