"use client";
import { ReactNode, useState } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";

export default function CoursesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { cid } = useParams();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const course = courses.find((c: any) => c._id === cid);
  const [showNav, setShowNav] = useState(true);
  return (
    <div id="wd-courses">
      <h2>
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          onClick={() => setShowNav((prev) => !prev)}
          role="button"
          aria-label="Toggle course navigation"
        />
        {course?.name}
      </h2>
      <hr />
      <div className="mb-2">
        <Breadcrumb course={course} />
      </div>
      <div className="d-flex">
        {showNav && (
          <div className="d-none d-md-block">
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
