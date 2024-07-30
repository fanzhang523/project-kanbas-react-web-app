import React, { useState } from "react";

export default function AssignmentForm({ dialogTitle, assignment, setAssignment, saveAssignment }:
{ dialogTitle: string; assignment: any; setAssignment: (assignment: any) => void; saveAssignment: () => void; }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAssignment({ ...assignment, [name]: value });
  };

  return (
    <div
      id="wd-add-assignment-dialog"
      className="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {dialogTitle}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Assignment Name
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={assignment.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                New Assignment Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={assignment.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="points" className="form-label">
                Points
              </label>
              <input
                type="number"
                className="form-control"
                id="points"
                name="points"
                value={assignment.points || 100}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Assign</label>
              <div className="border p-3">
                <div className="mb-3">
                  <label htmlFor="dueDate" className="form-label">
                    Due
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dueDate"
                    name="dueDate"
                    value={assignment.dueDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="row">
                  <div className="col">
                    <label htmlFor="availableFrom" className="form-label">
                      Available from
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="availableFrom"
                      name="availableFrom"
                      value={assignment.availableFrom}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="availableUntil" className="form-label">
                      Until
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="availableUntil"
                      name="availableUntil"
                      value={assignment.availableUntil}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              onClick={saveAssignment}
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
