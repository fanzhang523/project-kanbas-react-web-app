import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function AssignmentControlButtons(
  { assignmentId, deleteAssignment, editAssignment }: { assignmentId: string; deleteAssignment: (assignmentId: string) => void; editAssignment: (assignmentId: string) => void}) {
  return (
    <div className="float-end">
      <FaPencil onClick={() => editAssignment(assignmentId)} className="text-primary me-3" />
      <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteAssignment(assignmentId)} />
      <GreenCheckmark />
      <BsPlus className="fs-2" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
