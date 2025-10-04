import Link from "next/link";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="p-3" style={{ maxWidth: 600 }}>
      <h2 className="mb-3">Profile</h2>

      <div className="mb-2">
        <input
          defaultValue="alice"
          className="form-control"
          placeholder="username"
        />
      </div>

      <div className="mb-2">
        <input
          defaultValue="123"
          className="form-control"
          placeholder="password"
          type="password"
        />
      </div>

      <div className="mb-2">
        <input
          defaultValue="Alice"
          className="form-control"
          placeholder="First Name"
          id="wd-firstname"
        />
      </div>

      <div className="mb-2">
        <input
          defaultValue="Wonderland"
          className="form-control"
          placeholder="Last Name"
          id="wd-lastname"
        />
      </div>

      <div className="mb-2">
        <input
          defaultValue="2000-01-01"
          className="form-control"
          type="date"
          id="wd-dob"
        />
      </div>

      <div className="mb-2">
        <input
          defaultValue="alice@wonderland"
          className="form-control"
          type="email"
          id="wd-email"
        />
      </div>

      <div className="mb-2">
        <select defaultValue="FACULTY" id="wd-role" className="form-select">
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </select>
      </div>

      <div>
        <Link href="/Account/SignIn">Sign out</Link>
      </div>
    </div>
  );
}
