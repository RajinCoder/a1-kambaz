"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as db from "../../../../Database";
import {
  Form,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";

type Assignment = {
  course: string;
  id: string;
  title: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableDate?: string;
};

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignments: Assignment[] = db.assignments || [];
  const assignment = assignments.find((a) => a.course === cid && a.id === aid);

  // call hooks unconditionally (avoid early-return before hooks)
  const [title, setTitle] = useState<string>(assignment?.title ?? "");
  const [description, setDescription] = useState<string>(
    assignment?.description ?? ""
  );
  const [points, setPoints] = useState<number | "">(assignment?.points ?? "");
  const [availableDate, setAvailableDate] = useState<string>(
    assignment?.availableDate ?? ""
  );
  const [dueDate, setDueDate] = useState<string>(assignment?.dueDate ?? "");

  if (!assignment) return <div>Assignment not found</div>;

  return (
    <div id="wd-edit-assignment" className="p-3">
      <h3 className="mb-3">Edit Assignment</h3>

      <Form>
        <FormGroup className="mb-3" controlId="assignmentTitle">
          <FormLabel>Assignment Title</FormLabel>
          <FormControl
            type="text"
            value={title}
            onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
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
              />
            </FormGroup>
          </Col>

          <Col md={3} className="mb-2">
            <FormGroup controlId="availableDate">
              <FormLabel>Available Date</FormLabel>
              <FormControl
                type="date"
                value={availableDate}
                onChange={(e) =>
                  setAvailableDate((e.target as HTMLInputElement).value)
                }
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
              />
            </FormGroup>
          </Col>

          <Col md={3} className="d-flex align-items-end mb-2">
            <Link
              href={`/Courses/${cid}/Assignments`}
              className="btn btn-outline-secondary me-2"
            >
              Cancel
            </Link>
            <Link
              href={`/Courses/${cid}/Assignments`}
              className="btn btn-primary"
            >
              Save
            </Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
