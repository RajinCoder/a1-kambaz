import path from 'path';
import { promises as fs } from 'fs';
import { NextRequest } from 'next/server';

type User = {
  loginId: string;
  password?: string;
  courses?: unknown[];
  [k: string]: unknown;
};

const dbDir = path.join(process.cwd(), 'src', 'app', '(Kambaz)', 'Database');

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { loginId, password } = (body ?? {}) as { loginId?: unknown; password?: unknown };

    if (typeof loginId !== 'string' || typeof password !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing or invalid loginId or password' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const usersPath = path.join(dbDir, 'users.json');
    const raw = await fs.readFile(usersPath, 'utf8');
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    const users: User[] = Array.isArray(parsed)
      ? parsed
          .filter((u): u is Record<string, unknown> => 
            typeof u === 'object' && u !== null && 'loginId' in u && typeof u.loginId === 'string'
          )
          .map(u => u as User)
      : [];

    const user = users.find(u => u.loginId === loginId && u.password === password);
    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const safe = { ...user } as Record<string, unknown>;
    delete safe.password;

    return new Response(JSON.stringify(safe), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('login route error', err);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}