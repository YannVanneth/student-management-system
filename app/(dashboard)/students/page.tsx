"use client";

import { useState } from "react";
import {
  ChevronDown,
  Download,
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StudentTable } from "@/components/student-table";
import { StudentFilters } from "@/components/student-filters";
import { AddStudentDialog } from "@/components/add-student-dialog";
import UpComingFeatures from "@/components/feature-comming-soon";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Student } from "@/const/student";
import { useGetAllStudentWithoutPaginationQuery } from "@/services/api";

export default function StudentPage() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, isLoading } = useGetAllStudentWithoutPaginationQuery({});

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "ID",
      "Name",
      "Grade",
      "Section",
      "Gender",
      "Contact",
      "Status",
    ];

    const tableRows = [...data["data"]["students"]].map((student: Student) => [
      student.id,
      student.personal_info.first_name + " " + student.personal_info.last_name,
      student.academic_info.grade,
      student.academic_info.section,
      student.personal_info.gender,
      student.personal_info.contact_number,
      student.status ? "Active" : "Inactive",
    ]);

    autoTable(doc, {
      headStyles: {
        fillColor: "#e83334",
        textColor: "#fff",
      },
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 10 },
      theme: "grid",
    });

    doc.text("Student List", 14, 15);
    doc.save("student_list.pdf");
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Students</CardTitle>
            <CardDescription>
              Manage your student records in one place.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => exportPDF()}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>

            <AddStudentDialog
              trigger={
                <Button size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              }
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 self-end">
              <UpComingFeatures>
                <Button
                  variant="outline"
                  size="sm"
                  // onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                  <ChevronDown
                    className={`h-4 w-4 ml-2 transition-transform ${
                      isFiltersVisible ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </UpComingFeatures>
            </div>
          </div>

          {isFiltersVisible && <StudentFilters />}

          <StudentTable searchQuery={searchQuery} />
        </div>
      </CardContent>
    </Card>
  );
}
