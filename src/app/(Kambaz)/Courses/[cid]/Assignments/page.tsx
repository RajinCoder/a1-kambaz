"use client";
import {
  ListGroup,
  ListGroupItem,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";
import Link from "next/link";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "next/navigation";
import * as db from "../../../Database";

type Assignment = {
  course: string;
  id: string;
  title: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableDate?: string;
};

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments || [];

  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <div className="flex-grow-1 me-2">
          <InputGroup>
            <span className="input-group-text bg-white border-end-0">
              <FaSearch />
            </span>
            <FormControl
              placeholder="Search for Assignment"
              className="border-start-0"
            />
          </InputGroup>
        </div>
        <div>
          <Button variant="outline-secondary" className="me-2">
            <FaPlus className="me-1" /> Group
          </Button>
          <Button variant="success">
            <FaPlus className="me-1" /> Assignment
          </Button>
        </div>
      </div>

      <ListGroup className="rounded-0">
        {assignments
          .filter((a: Assignment) => a.course === cid)
          .map((a: Assignment) => (
            <ListGroupItem
              className="wd-lesson p-3 mb-3 d-flex align-items-start"
              key={a.id}
            >
              <BsGripVertical className="me-3 fs-4 text-muted" />
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <div className="fw-bold">
                      <Link href={`/Courses/${cid}/Assignments/${a.id}`}>
                        {a.title}
                      </Link>
                    </div>
                    <div className="text-muted small">
                      Due {a.dueDate} · Opens {a.availableDate} · {a.points} pts
                    </div>
                  </div>
                  <div>
                    <Link
                      href={`/Courses/${cid}/Assignments/${a.id}`}
                      className="btn btn-outline-secondary btn-sm me-2"
                    >
                      Edit
                    </Link>
                    <Button variant="secondary" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
