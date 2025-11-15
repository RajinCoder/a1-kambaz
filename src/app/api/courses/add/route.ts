/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path';
import { promises as fs } from 'fs';

const dbDir = path.join(process.cwd(), 'src', 'app', '(Kambaz)', 'Database');

export async function POST(req: Request) {
  const body = await req.json();
  const { code, title, description = '', ownerLoginId = null } = body;
  if (!code || !title) {
    return new Response(JSON.stringify({ error: 'code and title required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const coursesPath = path.join(dbDir, 'courses.json');
  const raw = await fs.readFile(coursesPath, 'utf8');
  const courses = JSON.parse(raw || '[]') as any[];

  const newCourse = { id: String(Date.now()), code, title, description, ownerLoginId, createdAt: new Date().toISOString() };
  courses.push(newCourse);
  await fs.writeFile(coursesPath, JSON.stringify(courses, null, 2), 'utf8');

  return new Response(JSON.stringify(newCourse), { status: 201, headers: { 'Content-Type': 'application/json' } });
}
