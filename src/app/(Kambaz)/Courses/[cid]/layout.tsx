"use client";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../store";

export default function CoursesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { cid } = useParams();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const course = courses.find((c: any) => c._id === cid);
  const [showNav, setShowNav] = useState(true);
  const router = useRouter();

  type Enrollment = { _id: string; user: string; course: string };
  const canAccess = useMemo(() => {
    if (!currentUser) return false;
    const isFacultyOrAdmin =
      currentUser.role === "FACULTY" || currentUser.role === "ADMIN";
    if (isFacultyOrAdmin) return true;
    return (enrollments as Enrollment[]).some(
      (e) => e.user === currentUser._id && e.course === cid
    );
  }, [currentUser, enrollments, cid]);

  useEffect(() => {
    if (!canAccess) {
      router.replace("/Dashboard");
    }
  }, [canAccess, router]);
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
