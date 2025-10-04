import Link from "next/link";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="p-3" style={{ maxWidth: 480 }}>
      <h2 className="mb-3">Sign up</h2>
      <div className="mb-2">
        <input className="form-control" placeholder="username" />
      </div>

      <div className="mb-2">
        <input
          className="form-control"
          placeholder="password"
          type="password"
        />
      </div>

      <div className="mb-2">
        <input
          className="form-control"
          placeholder="verify password"
          type="password"
        />
      </div>

      <div className="mb-2">
        <Link href="/Account/Profile" className="btn btn-primary w-100">
          Sign up
        </Link>
      </div>

      <div>
        <Link href="/Account/SignIn">Sign in</Link>
      </div>
    </div>
  );
}
