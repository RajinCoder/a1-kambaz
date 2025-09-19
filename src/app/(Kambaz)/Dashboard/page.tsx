import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image
              src="/images/courses/cool.jpg"
              alt="photo1"
              width={200}
              height={150}
            />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/12345" className="wd-dashboard-course-link">
            <Image
              src="/images/courses/cool2.jpg"
              alt="photo2"
              width={200}
              height={150}
            />
            <div>
              <h5> CS12345 Photography 1 </h5>
              <p className="wd-dashboard-course-title">Junior Photographer</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/123456" className="wd-dashboard-course-link">
            <Image
              src="/images/courses/cool3.jpg"
              alt="photo3"
              width={200}
              height={150}
            />
            <div>
              <h5> CS123456 Photography 2 </h5>
              <p className="wd-dashboard-course-title">Junior Photographer I</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234567" className="wd-dashboard-course-link">
            <Image
              src="/images/courses/cool4.jpg"
              alt="photo4"
              width={200}
              height={150}
            />
            <div>
              <h5> CS1234567 Photography 3 </h5>
              <p className="wd-dashboard-course-title">
                Junior Photographer II
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1" className="wd-dashboard-course-link">
            <Image
              src="/images/courses/cool5.jpg"
              alt="photo5"
              width={200}
              height={150}
            />
            <div>
              <h5> CS1 Photography 4 </h5>
              <p className="wd-dashboard-course-title">Photographer I</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/12" className="wd-dashboard-course-link">
            <Image
              src="/images/courses/cool6.jpg"
              alt="photo6"
              width={200}
              height={150}
            />
            <div>
              <h5> CS12 Photography 5 </h5>
              <p className="wd-dashboard-course-title">Photographer II</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/123" className="wd-dashboard-course-link">
            <Image
              src="/images/courses/cool7.jpg"
              alt="photo7"
              width={200}
              height={150}
            />
            <div>
              <h5> CS123 Photography 6 </h5>
              <p className="wd-dashboard-course-title">
                Principal Photographer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
