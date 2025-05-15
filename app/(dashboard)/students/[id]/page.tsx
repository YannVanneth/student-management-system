import type { Metadata } from "next";
import { StudentDetails } from "@/components/student-details";

export const metadata: Metadata = {
  title: "Student Details",
  description: "View detailed information about a student.",
};

interface StudentPageProps {
  params: {
    id: string;
  };
}

export default function StudentPage({ params }: StudentPageProps) {
  return (
    <div className="container p-6">
      <StudentDetails studentId={params.id} />
    </div>
  );
}
