"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation({
  params,
}: {
  params?: { cid?: string };
}) {
  // links to render in the sidebar
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  const pathname = usePathname();

  // try to extract cid from params first; fallback to parsing pathname
  const cid = params?.cid ?? pathname?.split("/")[2];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((label) => {
        // special case for People: previous routes used /People/Table
        const slug = label === "People" ? "People/Table" : label;
        const href = `/Courses/${cid}/${slug}`;
        const isActive =
          pathname?.includes(`/${label}`) ||
          (label === "Home" && pathname?.endsWith("/Home"));
        return (
          <div key={label}>
            <Link
              href={href}
              id={`wd-course-${label.toLowerCase()}-link`}
              className={`list-group-item border-0 ${
                isActive ? "active" : "text-danger"
              }`}
            >
              {label}
            </Link>
            <br />
          </div>
        );
      })}
    </div>
  );
}
