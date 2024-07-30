import AssignmentForm from "./AssignmentForm";
import { useState } from "react";

export default function AssignmentsControls({ assignment, setAssignment, saveAssignment }:
{ assignment: any; setAssignment: (assignment: any) => void; saveAssignment: () => void; }) {
  return (
    <div id="wd-assignments-controls" className="text-nowrap">
      <button className="btn btn-lg btn-danger me-1 float-end"
        data-bs-toggle="modal" data-bs-target="#wd-add-assignment-dialog" >
        + Assignment
      </button>
      <AssignmentForm dialogTitle="Add Assignment" assignment={assignment}
                    setAssignment={setAssignment} saveAssignment={saveAssignment} />
    </div>
  );
}
