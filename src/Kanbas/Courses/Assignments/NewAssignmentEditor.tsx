import React from 'react';

export default function NewAssignmentEditor({ dialogTitle, assignment, setAssignment, saveAssignment }:
  { dialogTitle: string; assignment: any; setAssignment: (field: string, value: any) => void; saveAssignment: () => void; }) {

  return (
    <div id="wd-add-new-assignment-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">{dialogTitle}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <input className="form-control mb-2" value={assignment.name} placeholder="Assignment Name"
              onChange={(e) => setAssignment('name', e.target.value)} />
            <textarea className="form-control mb-2" value={assignment.description} placeholder="Assignment Description"
              onChange={(e) => setAssignment('description', e.target.value)} />
            <input className="form-control mb-2" type="number" value={assignment.points} placeholder="Points"
              onChange={(e) => setAssignment('points', e.target.value)} />
            <input className="form-control mb-2" type="date" value={assignment.dueDate} placeholder="Due Date"
              onChange={(e) => setAssignment('dueDate', e.target.value)} />
            <input className="form-control mb-2" type="date" value={assignment.availableFrom} placeholder="Available From"
              onChange={(e) => setAssignment('availableFrom', e.target.value)} />
            <input className="form-control" type="date" value={assignment.availableUntil} placeholder="Available Until"
              onChange={(e) => setAssignment('availableUntil', e.target.value)} />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button onClick={saveAssignment} type="button" data-bs-dismiss="modal" className="btn btn-danger">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
