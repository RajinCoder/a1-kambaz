import path from 'path';
import { promises as fs } from 'fs';

const dbDir = path.join(process.cwd(), 'src', 'app', '(Kambaz)', 'Database');

export async function GET() {
  const coursesPath = path.join(dbDir, 'courses.json');
  const raw = await fs.readFile(coursesPath, 'utf8');
  const courses = JSON.parse(raw || '[]');
  return new Response(JSON.stringify(courses), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
