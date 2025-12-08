/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as courseClient from "../Courses/client";
import * as enrollmentClient from "../Enrollments/client"; // Add this
import { setCourses } from "../Courses/reducer";
import { RootState } from "../store";
import { setEnrollments, enroll, unenroll } from "../Enrollments/reducer"; // Update import

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  ); // From Redux, not Database
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState<boolean>(false);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const fetchCourses = async () => {
    try {
      const courses = await courseClient.findMyCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEnrollments = async () => {
    if (!currentUser) return;
    try {
      const enrollments = await enrollmentClient.findEnrollmentsForUser(
        currentUser._id
      );
      dispatch(setEnrollments(enrollments));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, [currentUser]);

  const isFacultyOrAdmin =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const filteredCourses = currentUser
    ? showAll
      ? courses
      : isFacultyOrAdmin
      ? courses
      : courses.filter((course: any) =>
          enrollments.some(
            (enrollment: any) =>
              enrollment.user === currentUser._id &&
              enrollment.course === course._id
          )
        )
    : [];

  const onAddNewCourse = async () => {
    const newCourse = await courseClient.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onUpdateCourse = async () => {
    await courseClient.updateCourse(course);
    dispatch(
      setCourses(courses.map((c) => (c._id === course._id ? course : c)))
    );
  };

  const onDeleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
  };

  // New: Enroll via server
  const onEnroll = async (courseId: string) => {
    if (!currentUser) return;
    const newEnrollment = await enrollmentClient.enrollInCourse(
      courseId,
      currentUser._id
    );
    dispatch(enroll(newEnrollment));
  };

  // New: Unenroll via server
  const onUnenroll = async (courseId: string) => {
    if (!currentUser) return;
    const enrollment = enrollments.find(
      (e: any) => e.user === currentUser._id && e.course === courseId
    );
    if (enrollment) {
      await enrollmentClient.unenrollFromCourse(enrollment._id);
      dispatch(unenroll({ user: currentUser._id, course: courseId }));
    }
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h5>
        New Course
        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={onAddNewCourse}
        >
          Add
        </button>
        <button
          className="btn btn-info float-end me-2"
          id="wd-toggle-enrollments"
          onClick={() => setShowAll((s) => !s)}
        >
          Enrollments
        </button>
        <button
          className="btn btn-secondary float-end me-2"
          onClick={onUpdateCourse}
          id="wd-update-course-click"
        >
          Update
        </button>
      </h5>
      <br />
      <FormControl
        value={course.name}
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        as="textarea"
        value={course.description}
        rows={3}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({filteredCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} sm={2} md={4} lg={4} xl={5} className="g-4">
          {filteredCourses.map((course) => (
            <Col
              key={course._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={`/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    variant="top"
                    src={"/images/reactjs.jpg"}
                    style={{ height: 160, objectFit: "cover" }}
                  />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>
                    <Button variant="primary">Go</Button>
                    {currentUser &&
                      (enrollments.some(
                        (e: any) =>
                          e.user === currentUser._id && e.course === course._id
                      ) ? (
                        <Button
                          variant="danger"
                          className="ms-2"
                          onClick={(event) => {
                            event.preventDefault();
                            onUnenroll(course._id); // Call server function
                          }}
                        >
                          Unenroll
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          className="ms-2"
                          onClick={(event) => {
                            event.preventDefault();
                            onEnroll(course._id); // Call server function
                          }}
                        >
                          Enroll
                        </Button>
                      ))}
                    <Button
                      onClick={(event) => {
                        event.preventDefault();
                        onDeleteCourse(course._id);
                      }}
                      variant="danger"
                      className="float-end"
                      id="wd-delete-course-click"
                    >
                      Delete
                    </Button>
                    <Button
                      id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      }}
                      variant="warning"
                      className="me-2 float-end"
                    >
                      Edit
                    </Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
