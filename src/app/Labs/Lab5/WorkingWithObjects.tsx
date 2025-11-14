import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "";

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [moduleState, setModuleState] = useState({
    id: "M01",
    name: "WebDev 2025 Module",
    description: "Introduction to Node, Express and React integration",
    course: "Web Development 2025",
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}`}
      >
        Get Assignment
      </a>
      <hr />

      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}/title`}
      >
        Get Title
      </a>
      <hr />

      <h4>Modifying Properties</h4>
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/title/${encodeURIComponent(
          assignment.title
        )}`}
      >
        Update Title
      </a>
      <FormControl
        className="w-75"
        id="wd-assignment-title"
        value={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <hr />

      <h4>Assignment: score & completed</h4>
      <div className="mb-2">
        <label className="form-label me-2">Score:</label>
        <input
          id="wd-assignment-score"
          type="number"
          className="form-control d-inline-block w-25"
          value={assignment.score}
          onChange={(e) =>
            setAssignment({ ...assignment, score: Number(e.target.value) })
          }
        />
        <a
          id="wd-update-assignment-score"
          className="btn btn-primary ms-2"
          href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
        >
          Update Score
        </a>
      </div>
      <div className="mb-2">
        <label className="form-check-label me-2">Completed:</label>
        <input
          id="wd-assignment-completed"
          type="checkbox"
          className="form-check-input"
          checked={assignment.completed}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <a
          id="wd-update-assignment-completed"
          className="btn btn-primary ms-2"
          href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
        >
          Update Completed
        </a>
      </div>
      <hr />

      <h4>Module: retrieve & modify</h4>
      <a
        id="wd-retrieve-module"
        className="btn btn-primary me-2"
        href={`${MODULE_API_URL}`}
      >
        Get Module
      </a>
      <a
        id="wd-retrieve-module-name"
        className="btn btn-secondary"
        href={`${MODULE_API_URL}/name`}
      >
        Get Module Name
      </a>
      <hr />

      <div className="mb-2">
        <label className="form-label">Module Name</label>
        <FormControl
          id="wd-module-name"
          value={moduleState.name}
          onChange={(e) =>
            setModuleState({ ...moduleState, name: e.target.value })
          }
        />
        <a
          id="wd-update-module-name"
          className="btn btn-primary mt-2"
          href={`${MODULE_API_URL}/name/${encodeURIComponent(
            moduleState.name
          )}`}
        >
          Update Module Name
        </a>
      </div>

      <div className="mb-2">
        <label className="form-label">Module Description</label>
        <FormControl
          id="wd-module-description"
          value={moduleState.description}
          onChange={(e) =>
            setModuleState({ ...moduleState, description: e.target.value })
          }
        />
        <a
          id="wd-update-module-description"
          className="btn btn-primary mt-2"
          href={`${MODULE_API_URL}/description/${encodeURIComponent(
            moduleState.description
          )}`}
        >
          Update Module Description
        </a>
      </div>
      <hr />
    </div>
  );
}
