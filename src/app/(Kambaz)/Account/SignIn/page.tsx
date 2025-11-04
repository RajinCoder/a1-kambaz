"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../Database";
import { FormControl, Button } from "react-bootstrap";

type Credentials = { username: string; password: string };
export default function Signin() {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const signin = () => {
    // Flexible matching since users.json has no username/password
    // Match on loginId, or firstName (case-insensitive), or "First Last"
    const user = (db.users as Array<Record<string, unknown>>).find((u) => {
      const uname = (credentials.username ?? "")
        .toString()
        .trim()
        .toLowerCase();
      const first =
        (u.firstName as string | undefined)?.toString().toLowerCase() ?? "";
      const last =
        (u.lastName as string | undefined)?.toString().toLowerCase() ?? "";
      const full = `${first} ${last}`.trim();
      return (
        (u.loginId as string | undefined)?.toString().toLowerCase() === uname ||
        first === uname ||
        full === uname
      );
    });
    if (!user) return;
    dispatch(setCurrentUser(user));
    router.replace("/Dashboard");
  };
  return (
    <div id="wd-signin-screen" className="p-3" style={{ maxWidth: 400 }}>
      <h1>Sign in</h1>
      <FormControl
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        className="mb-2"
        placeholder="username (loginId or First Last)"
        id="wd-username"
      />
      <FormControl
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        className="mb-2"
        placeholder="password"
        type="password"
        id="wd-password"
      />
      <Button onClick={signin} id="wd-signin-btn" className="w-100">
        Sign in
      </Button>
      <Link id="wd-signup-link" href="/Account/Signup">
        Sign up
      </Link>
    </div>
  );
}
