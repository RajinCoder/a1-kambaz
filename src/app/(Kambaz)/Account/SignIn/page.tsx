import Link from "next/link";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="p-3" style={{ maxWidth: 400 }}>
      <h2 className="mb-3">Sign in</h2>
      <div>
        <div className="mb-2">
          <input
            className="form-control"
            placeholder="username"
            id="wd-username"
          />
        </div>

        <div className="mb-2">
          <input
            className="form-control"
            placeholder="password"
            type="password"
            id="wd-password"
          />
        </div>

        <div className="mb-2">
          <Link href="/Account/Profile" className="btn btn-primary w-100">
            Sign in
          </Link>
        </div>

        <div>
          <Link href="/Account/Signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
