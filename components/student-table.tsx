"use client";

import { useState } from "react";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  useDeleteStudentMutation,
  useGetAllStudentsQuery,
} from "@/services/api";
import { Student } from "@/const/student";
import { EditStudentDialog } from "./edit-student-dialog";
import ConfirmDialog from "./comfirm_comp";
import { toast } from "sonner";

interface StudentTableProps {
  searchQuery: string;
}

export function StudentTable({ searchQuery }: StudentTableProps) {
  const [selectedStudents, setSelectedStudents] = useState<Student>();
  const [sortColumn, setSortColumn] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  let [page, setPage] = useState(1);

  const {
    data,
    isLoading: loading,
    error,
  } = useGetAllStudentsQuery({
    page: page,
    perPage: 10,
  });

  const [deleteStudent, { data: deleteData, status: deleteStatus }] =
    useDeleteStudentMutation();

  if (loading) return <div>Loading...</div>;
  if (error) {
    const errorMessage =
      "status" in error
        ? `Error ${error.status}: ${JSON.stringify(error.data)}`
        : error.message || "An unknown error occurred";
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead colSpan={7} className="h-24 text-center">
                {errorMessage}
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead colSpan={7} className="h-24 text-center">
                No students found.
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
    );
  } else {
    var students: any = data["data"]["students"];
  }

  const filteredStudents = students.filter(
    (student: Student) =>
      (student.personal_info.first_name + student.personal_info.last_name)
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      student.id.toString().includes(searchQuery.toLowerCase()) ||
      student.personal_info.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  if (filteredStudents.length === 0) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead colSpan={7} className="h-24 text-center">
                No students found.
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
    );
  }

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    let aValue: any, bValue: any;

    switch (sortColumn) {
      case "first_name":
        aValue = a.personal_info.first_name.toLowerCase();
        bValue = b.personal_info.first_name.toLowerCase();
        break;
      case "grade":
        aValue = a.academic_info.grade;
        bValue = b.academic_info.grade;
        break;
      case "status":
        aValue = a.status;
        bValue = b.status;
        break;
      default:
        aValue = a[sortColumn];
        bValue = b[sortColumn];
    }

    if (aValue === undefined || bValue === undefined) return 0;

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

  const handleSort = (column: string) => {
    console.log("Sorting by column:", column);
    console.log("Current sort column:", sortColumn);
    setSortDirection("asc");

    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  async function handleDelete(id: string) {
    const res = await deleteStudent(id);

    if (res.error) {
      const errorMessage =
        "status" in res.error
          ? `Error ${res.error.status}: ${JSON.stringify(res.error.data)}`
          : res.error.message || "An unknown error occurred";
      console.log(errorMessage);
    }

    if (res.data) {
      const successMessage = res.data.message;
      alert(successMessage);
    }
  }

  function handleClick(id: string): void {
    window.location.href = `/students/${id}`;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-1"
                  onClick={() => handleSort("id")}
                >
                  ID
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-1"
                  onClick={() => handleSort("first_name")}
                >
                  Name
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </TableHead>
            <TableHead className="w-[100px]">
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-1"
                  onClick={() => handleSort("grade")}
                >
                  Grade
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </TableHead>
            <TableHead className="w-[100px]">Section</TableHead>
            <TableHead className="w-[100px]">Gender</TableHead>
            <TableHead className="hidden md:table-cell">Contact</TableHead>
            <TableHead className="w-[100px] pr-14">
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-1"
                  onClick={() => handleSort("status")}
                >
                  Status
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedStudents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center">
                No students found.
              </TableCell>
            </TableRow>
          ) : (
            sortedStudents.map((student) => (
              <TableRow
                key={student.id}
                className="group"
                onClick={() => handleClick(student.id)}
              >
                <TableCell className="font-medium pl-5">{student.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={student.personal_info.avatar ?? "/placeholder.svg"}
                        alt={
                          student.personal_info.last_name +
                          " " +
                          student.personal_info.first_name
                        }
                      />
                      <AvatarFallback>
                        {student.personal_info.first_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="font-medium">
                      {student.personal_info.first_name}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="pl-3.5">
                  {student.academic_info.grade}
                </TableCell>
                <TableCell>{student.academic_info.section}</TableCell>
                <TableCell>{student.academic_info.gender ?? "male"}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {student.personal_info.contact_number ?? "N/A"}
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      student.status === 0
                        ? "bg-red-500 text-white"
                        : "bg-green-700 text-white"
                    }
                  >
                    {student.status === 1 ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant={"outline"}
                    className="border-none bg-none w-fit justify-start font-normal hover:bg-green-900 hover:text-white "
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen(true);
                      setSelectedStudents(student);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={"outline"}
                    className="border-none bg-none w-fit justify-start font-normal hover:bg-red-500 hover:text-white "
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDelete(true);
                      setSelectedStudents(student);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <EditStudentDialog
        open={open}
        onOpenChange={setOpen}
        student={selectedStudents}
      />

      <ConfirmDialog
        open={openDelete}
        onChange={setOpenDelete}
        onConfirm={() => {
          handleDelete(selectedStudents!.id);
          toast.success("Student deleted successfully", {
            style: {
              backgroundColor: "green",
              color: "white",
            },
            duration: 2500,
          });
        }}
      />

      <div className="flex items-center justify-between px-4 py-4 border-t">
        <div className="text-sm text-muted-foreground w-[200px]">
          Showing <strong>{data["data"]["showing_count"]}</strong> of{" "}
          <strong>{data["data"]["total"]}</strong> students
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="cursor-pointer"
                onClick={() =>
                  setPage(
                    page > 1 ? --page : Math.ceil(data["data"]["total"] / 10)
                  )
                }
              />
            </PaginationItem>
            {Array.from(
              { length: Math.ceil(data["data"]["total"] / 10) },
              (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={page === index + 1}
                    onClick={() => setPage(index + 1)}
                    className="cursor-pointer mr-2"
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setPage(
                    page >= Math.ceil(data["data"]["total"] / 10) ? 1 : ++page
                  )
                }
                className="cursor-pointer"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
