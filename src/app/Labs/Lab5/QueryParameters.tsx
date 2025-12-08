"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "";
export default function QueryParameters() {
  const [a, setA] = useState("10");
  const [b, setB] = useState("3");

  return (
    <div>
      <h3>Query Parameters</h3>
      <FormControl
        className="mb-2"
        id="wd-query-parameter-a"
        type="number"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />
      <FormControl
        className="mb-2"
        id="wd-query-parameter-b"
        type="number"
        value={b}
        onChange={(e) => setB(e.target.value)}
      />
      <a
        className="btn btn-primary me-2"
        id="wd-query-add"
        href={`${HTTP_SERVER}/lab5/calculator?a=${a}&b=${b}&operation=add`}
      >
        Add {a} + {b}
      </a>
      <a
        className="btn btn-danger me-2"
        id="wd-query-subtract"
        href={`${HTTP_SERVER}/lab5/calculator?a=${a}&b=${b}&operation=subtract`}
      >
        Subtract {a} - {b}
      </a>
      <a
        className="btn btn-secondary me-2"
        id="wd-query-multiply"
        href={`${HTTP_SERVER}/lab5/calculator?a=${a}&b=${b}&operation=multiply`}
      >
        Multiply {a} * {b}
      </a>
      <a
        className="btn btn-warning"
        id="wd-query-divide"
        href={`${HTTP_SERVER}/lab5/calculator?a=${a}&b=${b}&operation=divide`}
      >
        Divide {a} / {b}
      </a>
      <hr />
    </div>
  );
}
