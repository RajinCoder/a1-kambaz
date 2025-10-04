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
} from "react-bootstrap";

const courses = [
  {
    id: "1234",
    title: "CS1234 React JS",
    desc: "Full Stack software developer",
    img: "/images/courses/cool.jpg",
  },
  {
    id: "12345",
    title: "CS12345 Photography 1",
    desc: "Junior Photographer",
    img: "/images/courses/cool2.jpg",
  },
  {
    id: "123456",
    title: "CS123456 Photography 2",
    desc: "Junior Photographer I",
    img: "/images/courses/cool3.jpg",
  },
  {
    id: "1234567",
    title: "CS1234567 Photography 3",
    desc: "Junior Photographer II",
    img: "/images/courses/cool4.jpg",
  },
  {
    id: "1",
    title: "CS1 Photography 4",
    desc: "Photographer I",
    img: "/images/courses/cool5.jpg",
  },
  {
    id: "12",
    title: "CS12 Photography 5",
    desc: "Photographer II",
    img: "/images/courses/cool6.jpg",
  },
  {
    id: "123",
    title: "CS123 Photography 6",
    desc: "Principal Photographer",
    img: "/images/courses/cool7.jpg",
  },
];

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} sm={2} md={4} lg={4} xl={5} className="g-4">
          {courses.map((c) => (
            <Col
              key={c.id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={`/Courses/${c.id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    variant="top"
                    src={c.img}
                    style={{ height: 160, objectFit: "cover" }}
                  />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {c.title}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {c.desc}
                    </CardText>
                    <Button variant="primary">Go</Button>
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
