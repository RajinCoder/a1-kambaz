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

export default function Assignments() {
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
        <ListGroupItem className="wd-lesson p-3 mb-3 d-flex align-items-start">
          <BsGripVertical className="me-3 fs-4 text-muted" />
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="fw-bold">
                  <Link href="/Courses/1234/Assignments/1">
                    A1 — Introduction
                  </Link>
                </div>
                <div className="text-muted small">
                  Due Oct 10 · Opens Oct 1 · 10 pts
                </div>
              </div>
              <div>
                <Link
                  href="/Courses/1234/Assignments/1"
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

        <ListGroupItem className="wd-lesson p-3 mb-3 d-flex align-items-start">
          <BsGripVertical className="me-3 fs-4 text-muted" />
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="fw-bold">
                  <Link href="/Courses/1234/Assignments/2">
                    A2 — Project Proposal
                  </Link>
                </div>
                <div className="text-muted small">
                  Due Oct 20 · Opens Oct 11 · 20 pts
                </div>
              </div>
              <div>
                <Link
                  href="/Courses/1234/Assignments/2"
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

        <ListGroupItem className="wd-lesson p-3 mb-3 d-flex align-items-start">
          <BsGripVertical className="me-3 fs-4 text-muted" />
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="fw-bold">
                  <Link href="/Courses/1234/Assignments/3">
                    A3 — Final Report
                  </Link>
                </div>
                <div className="text-muted small">
                  Due Nov 5 · Opens Oct 21 · 30 pts
                </div>
              </div>
              <div>
                <Link
                  href="/Courses/1234/Assignments/3"
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
      </ListGroup>
    </div>
  );
}
