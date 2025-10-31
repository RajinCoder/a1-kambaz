import Link from "next/link";
export default function Labs() {
  return (
    <div id="wd-labs">
      <h1>Labs</h1>
      <h2>Peter Moise</h2>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <Link className="nav-link" href="/Labs/Lab1" id="wd-lab1-link">
            Lab 1
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " href="/Labs/Lab2" id="wd-lab2-link">
            Lab 2
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/Labs/Lab3" id="wd-lab3-link">
            Lab 3
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" href="/Labs/Lab3" id="wd-lab3-link">
            Lab 4
          </Link>
        </li>
      </ul>
    </div>
  );
}
