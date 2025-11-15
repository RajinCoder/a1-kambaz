import path from 'path';
import { promises as fs } from 'fs';

const dbDir = path.join(process.cwd(), 'src', 'app', '(Kambaz)', 'Database');

export async function POST(req: Request) {
  const body = await req.json();
  const { firstName, lastName, loginId, password, section = 'S000', role = 'STUDENT' } = body;
  if (!loginId || !password || !firstName) {
    return new Response(JSON.stringify({ error: 'firstName, loginId and password required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const usersPath = path.join(dbDir, 'users.json');
  const raw = await fs.readFile(usersPath, 'utf8');
  const users = JSON.parse(raw || '[]') as any[];

  if (users.find(u => u.loginId === loginId)) {
    return new Response(JSON.stringify({ error: 'loginId already exists' }), { status: 409, headers: { 'Content-Type': 'application/json' } });
  }

  const newUser = {
    _id: String(Date.now()),
    firstName,
    lastName: lastName || '',
    loginId,
    password,
    section,
    role,
    lastActivity: null,
    totalActivity: '00:00:00'
  };

  users.push(newUser);
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2), 'utf8');

  const { password: _pw, ...safe } = newUser;
  return new Response(JSON.stringify(safe), { status: 201, headers: { 'Content-Type': 'application/json' } });
}
