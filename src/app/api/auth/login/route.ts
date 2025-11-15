/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path';
import { promises as fs } from 'fs';

const dbDir = path.join(process.cwd(), 'src', 'app', '(Kambaz)', 'Database');

export async function POST(req: Request) {
  const { loginId, password } = await req.json();
  const usersPath = path.join(dbDir, 'users.json');
  const raw = await fs.readFile(usersPath, 'utf8');
  const users = JSON.parse(raw || '[]') as any[];

  const user = users.find(u => u.loginId === loginId && u.password === password);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  const { password: _pw, ...safe } = user;
  return new Response(JSON.stringify(safe), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
