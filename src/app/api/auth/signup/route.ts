import path from 'path';
import { promises as fs } from 'fs';
import { NextRequest } from 'next/server';

const dbDir = path.join(process.cwd(), 'src', 'app', '(Kambaz)', 'Database');

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();
    if (typeof body !== 'object' || body === null) {
      return new Response(JSON.stringify({ error: 'Invalid request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const maybe = body as { [k: string]: unknown };
    const loginId = typeof maybe.loginId === 'string' ? maybe.loginId : '';
    const password = typeof maybe.password === 'string' ? maybe.password : '';

    if (!loginId || !password) {
      return new Response(JSON.stringify({ error: 'Missing loginId or password' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const usersPath = path.join(dbDir, 'users.json');
    const raw = await fs.readFile(usersPath, 'utf8');
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    const users = Array.isArray(parsed) ? parsed : [];

    // ensure we have objects and no explicit `any` usage
    const exists = users.some(u => {
      return typeof u === 'object' && u !== null && (u as { loginId?: unknown }).loginId === loginId;
    });

    if (exists) {
      return new Response(JSON.stringify({ error: 'User exists' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newUser = {
      loginId,
      password,
      // other defaults can be added here without using `any`
      courses: [],
    };

    const updatedUsers = [...users, newUser];
    await fs.writeFile(usersPath, JSON.stringify(updatedUsers, null, 2), 'utf8');

    // return safe user without password
    const safeUser: { [k: string]: unknown } = { ...newUser };
    delete safeUser.password;

    return new Response(JSON.stringify(safeUser), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('signup route error', err);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
