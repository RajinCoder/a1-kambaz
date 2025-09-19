// app/(Kambaz)e/Courses/[cid]/Assignments/[aid]/page.tsx
import Editor from "./Editor";

export default function AssignmentPage({
  params,
}: {
  params: { cid: string; aid: string };
}) {
  return <Editor courseId={params.cid} assignmentId={params.aid} />;
}
