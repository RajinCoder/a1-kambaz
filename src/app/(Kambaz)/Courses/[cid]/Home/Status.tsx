import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { AiOutlineHome, AiOutlineNotification } from "react-icons/ai";
import { FiBarChart2, FiEdit } from "react-icons/fi";
import { Button, ButtonGroup } from "react-bootstrap";

export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: 350 }}>
      <h2 className="h5 mb-3">Course Status</h2>

      <div className="d-flex mb-2">
        <div className="w-50 pe-1">
          <Button variant="secondary" size="lg" className="w-100 text-nowrap">
            <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish
          </Button>
        </div>
        <div className="w-50 ps-1">
          <Button variant="success" size="lg" className="w-100">
            <FaCheckCircle className="me-2 fs-5" /> Publish
          </Button>
        </div>
      </div>

      <Button variant="secondary" size="lg" className="w-100 mb-2 text-start">
        <BiImport className="me-2 fs-5" /> Import Existing Content
      </Button>

      <Button variant="secondary" size="lg" className="w-100 mb-2 text-start">
        <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons
      </Button>

      <Button
        variant="outline-secondary"
        size="lg"
        className="w-100 mb-2 text-start"
      >
        <AiOutlineHome className="me-2 fs-5" /> Choose Home Page
      </Button>

      <Button
        variant="outline-secondary"
        size="lg"
        className="w-100 mb-2 text-start"
      >
        <FiEdit className="me-2 fs-5" /> New Announcement
      </Button>

      <Button
        variant="outline-secondary"
        size="lg"
        className="w-100 mb-2 text-start"
      >
        <FiBarChart2 className="me-2 fs-5" /> New Analytics
      </Button>

      <Button
        variant="outline-secondary"
        size="lg"
        className="w-100 mb-2 text-start"
      >
        <AiOutlineNotification className="me-2 fs-5" /> View Course
        Notifications
      </Button>

      <ButtonGroup vertical className="w-100 mt-3">
        <Button variant="light" size="sm" className="text-start">
          <AiOutlineHome className="me-2" /> View Course Stream
        </Button>
      </ButtonGroup>
    </div>
  );
}
