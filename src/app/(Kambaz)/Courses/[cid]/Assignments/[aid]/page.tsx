"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../../../Assignments/reducer";
import type { Assignment } from "../../../Assignments/reducer";
import {
  Form,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
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

  const isNew = aid === "new";
  const existing = useMemo(
    () => assignments.find((a: Assignment) => a._id === aid),
    [assignments, aid]
  );

  // Controlled form state
  const [title, setTitle] = useState<string>(existing?.title ?? "");
  const [description, setDescription] = useState<string>(
    existing?.description ?? ""
  );
  const [points, setPoints] = useState<number | "">(existing?.points ?? "");
  const [availableFrom, setAvailableFrom] = useState<string>(
    existing?.availableFrom ?? ""
  );
  const [availableUntil, setAvailableUntil] = useState<string>(
    existing?.availableUntil ?? ""
  );
  const [dueDate, setDueDate] = useState<string>(existing?.dueDate ?? "");

  useEffect(() => {
    if (!isNew && !existing) {
      // assignment not found; navigate back
      router.replace(`/Courses/${cid}/Assignments`);
    }
  }, [cid, isNew, existing, router]);

  const goBack = () => router.replace(`/Courses/${cid}/Assignments`);
  const onSave = () => {
    if (!canEdit) return goBack();
    if (isNew) {
      dispatch(
        addAssignment({
          course: cid,
          title,
          description,
          points,
          dueDate,
          availableFrom,
          availableUntil,
        })
      );
    } else if (existing) {
      dispatch(
        updateAssignment({
          _id: existing._id,
          course: cid,
          title,
          description,
          points,
          dueDate,
          availableFrom,
          availableUntil,
        })
      );
    }
    goBack();
  };

  const disabled = !canEdit && !isNew; // students see read-only for existing

  return (
    <div id="wd-edit-assignment" className="p-3">
      <h3 className="mb-3">{isNew ? "New Assignment" : "Edit Assignment"}</h3>

      <Form>
        <FormGroup className="mb-3" controlId="assignmentTitle">
          <FormLabel>Assignment Title</FormLabel>
          <FormControl
            type="text"
            value={title}
            onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
            disabled={disabled}
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="assignmentDescription">
          <FormLabel>Description</FormLabel>
          <FormControl
            as="textarea"
            rows={4}
            value={description}
            onChange={(e) =>
              setDescription((e.target as HTMLTextAreaElement).value)
            }
            disabled={disabled}
          />
        </FormGroup>

        <Row className="mb-3">
          <Col md={3} className="mb-2">
            <FormGroup controlId="points">
              <FormLabel>Points</FormLabel>
              <FormControl
                type="number"
                value={points === "" ? "" : String(points)}
                onChange={(e) => {
                  const v = (e.target as HTMLInputElement).value;
                  setPoints(v ? Number(v) : "");
                }}
                disabled={disabled}
              />
            </FormGroup>
          </Col>

          <Col md={3} className="mb-2">
            <FormGroup controlId="availableFrom">
              <FormLabel>Available From</FormLabel>
              <FormControl
                type="date"
                value={availableFrom}
                onChange={(e) =>
                  setAvailableFrom((e.target as HTMLInputElement).value)
                }
                disabled={disabled}
              />
            </FormGroup>
          </Col>

          <Col md={3} className="mb-2">
            <FormGroup controlId="availableUntil">
              <FormLabel>Available Until</FormLabel>
              <FormControl
                type="date"
                value={availableUntil}
                onChange={(e) =>
                  setAvailableUntil((e.target as HTMLInputElement).value)
                }
                disabled={disabled}
              />
            </FormGroup>
          </Col>

          <Col md={3} className="mb-2">
            <FormGroup controlId="dueDate">
              <FormLabel>Due Date</FormLabel>
              <FormControl
                type="date"
                value={dueDate}
                onChange={(e) =>
                  setDueDate((e.target as HTMLInputElement).value)
                }
                disabled={disabled}
              />
            </FormGroup>
          </Col>

          <Col
            md={12}
            className="d-flex justify-content-end align-items-end mt-2"
          >
            <button
              type="button"
              className="btn btn-outline-secondary me-2"
              onClick={goBack}
            >
              Cancel
            </button>
            {canEdit && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={onSave}
              >
                Save
              </button>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}
