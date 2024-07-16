export default function AssignmentEditor() {
  return (
    <div className="container" style={{ marginTop: '-260px', marginRight: '-200px'}}>
      <div className="row mb-3">
        <div className="col-8">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#">CS5610 SU1 24 MON/FRI</a></li>
              <li className="breadcrumb-item active" aria-current="page">A1</li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-8">
          <h2>Assignment Name</h2>
          <input type="text" className="form-control" value="A1" readOnly />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-8">
          <p>The assignment is <a href="#" className="text-danger">available online</a></p>
          <p>Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following:</p>
          <ul>
            <li>Your full name and section</li>
            <li>Links to each of the lab assignments</li>
            <li>Link to the Kanban application</li>
            <li>Links to all relevant source code repositories</li>
          </ul>
          <p>The Kanban application should include a link to navigate back to the landing page.</p>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Points</label>
          <input type="number" className="form-control" value="100" />
        </div>
        <div className="col-md-4">
          <label className="form-label">Assignment Group</label>
          <select className="form-control">
            <option>ASSIGNMENTS</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Display Grade as</label>
          <select className="form-control">
            <option>Percentage</option>
            <option>Pass/No Pass</option>
            <option>Letter</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Submission Type</label>
          <select className="form-control">
            <option>Online</option>
            <option>In Person</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-8">
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
        <div className="col-md-4">
          <label className="form-label">Assign to</label>
          <select className="form-control">
            <option>Everyone</option>
            <option>Instructor</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Due</label>
          <input type="datetime-local" className="form-control" value="2024-05-13T23:59" />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Available from</label>
          <input type="datetime-local" className="form-control" value="2024-05-06T00:00" />
        </div>
        <div className="col-md-4">
          <label className="form-label">Until</label>
          <input type="datetime-local" className="form-control" />
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          <button className="btn btn-secondary me-2">Cancel</button>
          <button className="btn btn-danger">Save</button>
        </div>
      </div>
    </div>
  );
}
