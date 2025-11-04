"use client";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { deleteAssignment } from "../../Assignments/reducer";
import { Button, ListGroup } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function Assignments() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const canEdit =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const courseAssignments = assignments.filter((a) => a.course === cid);

  const onCreate = () => router.push(`/Courses/${cid}/Assignments/new`);
  const onOpen = (aid: string) =>
    router.push(`/Courses/${cid}/Assignments/${aid}`);
  const onDelete = (aid: string) => {
    if (typeof window !== "undefined") {
      if (window.confirm("Are you sure you want to remove this assignment?")) {
        dispatch(deleteAssignment(aid));
      }
    }
  };

  return (
    <div id="wd-assignments-screen">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Assignments</h3>
        {canEdit && (
          <Button id="wd-add-assignment-btn" onClick={onCreate}>
            <FaPlus className="me-2" /> Assignment
          </Button>
        )}
      </div>

      <ListGroup>
        {courseAssignments.map((a) => (
          <ListGroup.Item
            key={a._id}
            className="d-flex justify-content-between align-items-center"
          >
            <div
              role="button"
              tabIndex={0}
              className="flex-fill"
              onClick={() => onOpen(a._id)}
              onKeyDown={(e) => e.key === "Enter" && onOpen(a._id)}
            >
              <div className="fw-bold">{a.title}</div>
              <div className="text-muted small">
                Due {a.dueDate || "TBD"} • {a.points ?? 0} pts
              </div>
            </div>
            {canEdit && (
              <Button
                variant="outline-danger"
                size="sm"
                className="ms-2"
                aria-label="Delete assignment"
                onClick={() => onDelete(a._id)}
              >
                <FaTrash />
              </Button>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
