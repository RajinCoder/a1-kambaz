import React, { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import * as client from "./client";

export default function WorkingWithObjectsAsynchronously() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [assignment, setAssignment] = useState<any>({});

  const fetchAssignment = async () => {
    const a = await client.fetchAssignment();
    setAssignment(a || {});
  };

  useEffect(() => {
    fetchAssignment();
  }, []);

  const handleUpdateTitle = async () => {
    if (!assignment?.title) return;
    const updated = await client.updateTitle(assignment.title);
    setAssignment(updated || assignment);
  };

  const updateTitle = async (title: string) => {
    const updated = await client.updateTitle(title);
    setAssignment(updated || assignment);
  };

  return (
    <div id="wd-asynchronous-objects">
      <h3>Working with Objects Asynchronously</h3>

      <h4>Assignment</h4>
      <FormControl
        className="mb-2"
        value={assignment.title || ""}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
        placeholder="Title"
      />
      <button
        id="wd-update-assignment-title-async"
        className="btn btn-primary me-2"
        onClick={() => updateTitle(assignment.title)}
      >
        Update Title
      </button>

      <FormControl
        as="textarea"
        rows={3}
        className="mb-2"
        value={assignment.description || ""}
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
        placeholder="Description"
      />

      <FormControl
        type="date"
        className="mb-2"
        value={assignment.due || ""}
        onChange={(e) => setAssignment({ ...assignment, due: e.target.value })}
      />

      <div className="form-check form-switch mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="wd-completed-async"
          checked={Boolean(assignment.completed)}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="wd-completed-async">
          Completed
        </label>
      </div>

      <pre>{JSON.stringify(assignment, null, 2)}</pre>
      <hr />
    </div>
  );
}
