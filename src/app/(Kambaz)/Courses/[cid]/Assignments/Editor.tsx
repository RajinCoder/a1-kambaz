"use client";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function Editor() {
  return (
    <div id="wd-edit-assignment" className="p-3">
      <h3 className="mb-3">Edit Assignment</h3>
      <Form>
        <Form.Group className="mb-3" controlId="assignmentName">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter assignment name"
            defaultValue="A1 - Introduction"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="assignmentDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Add instructions or description"
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={4} className="mb-2">
            <Form.Group controlId="points">
              <Form.Label>Points</Form.Label>
              <Form.Control type="number" defaultValue={10} />
            </Form.Group>
          </Col>
          <Col md={4} className="mb-2">
            <Form.Group controlId="dueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Col>
          <Col md={4} className="d-flex align-items-end mb-2">
            <Button variant="primary" className="me-2">
              Save
            </Button>
            <Button variant="outline-secondary">Cancel</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
