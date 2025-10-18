"use client";
import {
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";

export default function Editor() {
  return (
    <div id="wd-edit-assignment" className="p-3">
      <h3 className="mb-3">Edit Assignment</h3>
      <Form>
        <FormGroup className="mb-3" controlId="assignmentName">
          <FormLabel>Assignment Name</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter assignment name"
            defaultValue="A1 - Introduction"
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="assignmentDescription">
          <FormLabel>Description</FormLabel>
          <FormControl
            as="textarea"
            rows={4}
            placeholder="Add instructions or description"
          />
        </FormGroup>

        <Row className="mb-3">
          <Col md={4} className="mb-2">
            <FormGroup controlId="points">
              <FormLabel>Points</FormLabel>
              <FormControl type="number" defaultValue={10} />
            </FormGroup>
          </Col>
          <Col md={4} className="mb-2">
            <FormGroup controlId="dueDate">
              <FormLabel>Due Date</FormLabel>
              <FormControl type="date" />
            </FormGroup>
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
