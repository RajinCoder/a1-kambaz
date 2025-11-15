import path from 'path';
import { promises as fs } from 'fs';
import { NextRequest } from 'next/server';

const dbDir = path.join(process.cwd(), 'src', 'app', '(Kambaz)', 'Database');

interface User {
  loginId: string;
  password?: string;
  [key: string]: unknown;
}

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

    if (!loginId) {
      return new Response(JSON.stringify({ error: 'Missing loginId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const usersPath = path.join(dbDir, 'users.json');
    const raw = await fs.readFile(usersPath, 'utf8');
    const parsed = raw ? JSON.parse(raw) : [];
    const users = Array.isArray(parsed) ? parsed : [];

    const user = users.find((u): u is User => 
      typeof u === 'object' && u !== null && 'loginId' in u && (u as User).loginId === loginId
    );
    
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const safe = { ...user };
    delete safe.password;

    return new Response(JSON.stringify(safe), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('profile route error', err);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}