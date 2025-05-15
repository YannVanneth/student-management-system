import { StudentDetails } from "@/components/student-details";

export default async function StudentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const param = await params;
  return (
    <div className="container p-6">
      <StudentDetails studentId={param.slug} />
    </div>
  );
}
