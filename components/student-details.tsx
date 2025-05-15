"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Download,
  Edit,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  User,
  UserCog,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { StudentAcademic } from "@/components/student-academic";
import { StudentFees } from "./student-fees";
import { EditStudentDialog } from "@/components/edit-student-dialog";
import { StudentAttendanceCalendar } from "./student-attendace-calender";
import { useGetStudentByIdQuery } from "@/services/api";
import { Student } from "@/const/student";

// // Mock student data
// const student = {
//   id: "ST001",
//   firstName: "Emma",
//   lastName: "Johnson",
//   email: "emma.j@example.com",
//   phone: "+1 (555) 123-4567",
//   gender: "Female",
//   dateOfBirth: "May 15, 2006",
//   age: "17",
//   bloodGroup: "O+",
//   address: "123 Maple Street",
//   city: "Springfield",
//   state: "IL",
//   zipCode: "62704",
//   country: "United States",
//   grade: "10",
//   section: "A",
//   rollNumber: "1001",
//   admissionDate: "August 15, 2021",
//   parentName: "David Johnson",
//   parentEmail: "david.j@example.com",
//   parentPhone: "+1 (555) 987-6543",
//   parentOccupation: "Software Engineer",
//   emergencyContact: "+1 (555) 456-7890",
//   emergencyContactName: "Sarah Johnson",
//   emergencyContactRelation: "Mother",
//   status: "Active",
//   avatar: "/placeholder.svg?height=128&width=128",
// };

function getAge(birthDate: string) {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
  ) {
    age--;
  }
  return age;
}
interface StudentDetailsProps {
  studentId: string;
}

export function StudentDetails({ studentId }: StudentDetailsProps) {
  const [activeTab, setActiveTab] = useState("profile");

  const { data, error, isLoading } = useGetStudentByIdQuery(studentId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading student data</div>;
  }

  if (!data) {
    return <div>No student data found</div>;
  }

  const student: Student = data["data"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/students">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to students</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Student Details</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <EditStudentDialog
            student={student}
            trigger={
              <Button size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit Student
              </Button>
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Student Profile
            </CardTitle>
            <Badge variant={student.status ? "default" : "secondary"}>
              {student.status ? "Active" : "Inactive"}
            </Badge>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage
                  src={student.personal_info.avatar || "/placeholder.svg"}
                  alt={`${student.personal_info.first_name} ${student.personal_info.last_name}`}
                />
                <AvatarFallback>
                  {student.personal_info.first_name.charAt(0)}
                  {student.personal_info.last_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1 text-center">
                <h2 className="text-xl font-bold">
                  {student.personal_info.first_name}{" "}
                  {student.personal_info.last_name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Student ID: {student.id}
                </p>
                <p className="text-sm text-muted-foreground">
                  Grade {student.academic_info.grade} - Section{" "}
                  {student.academic_info.section}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.personal_info.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {student.personal_info.contact_number}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {student.personal_info.date_of_birth} (Age:{" "}
                  {getAge(student.personal_info.date_of_birth)} years)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.personal_info.gender}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {student.address_info.address}, {student.address_info.city},{" "}
                  {student.address_info.city} {student.address_info.zip_code}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Admission Date: {"27th March 2023"}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="mb-2 text-sm font-medium">
                Parent/Guardian Information
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{student.parent_info.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{student.parent_info.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {student.parent_info.contact_number}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCog className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{"Doctor"}</span>
                </div>
              </div>
            </div>

            {/* <div className="mt-6">
              <h3 className="mb-2 text-sm font-medium">Emergency Contact</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {student.parent_info.name} ({student.parent_info.email})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{student.parent_info.phone}</span>
                </div>
              </div>
            </div> */}
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="fees">Fees</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Detailed information about the student.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-lg font-medium">
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Full Name
                        </p>
                        <p>
                          {student.personal_info.first_name}{" "}
                          {student.personal_info.last_name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Student ID
                        </p>
                        <p>{student.id}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Date of Birth
                        </p>
                        <p>{student.personal_info.date_of_birth}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Age
                        </p>
                        <p>
                          {getAge(student.personal_info.date_of_birth)} years
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Gender
                        </p>
                        <p>{student.personal_info.gender}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Blood Group
                        </p>
                        <p>{"A"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Email
                        </p>
                        <p>{student.personal_info.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Phone
                        </p>
                        <p>{student.personal_info.contact_number}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4 text-lg font-medium">
                      Address Information
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          Address
                        </p>
                        <p>{student.address_info.address}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          City
                        </p>
                        <p>{student.address_info.city}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          State
                        </p>
                        <p>{student.address_info.state}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Zip Code
                        </p>
                        <p>{student.address_info.zip_code}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Country
                        </p>
                        <p>
                          {student.address_info.country === ""
                            ? "N/A"
                            : student.address_info.country}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4 text-lg font-medium">
                      Parent/Guardian Information
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Parent/Guardian Name
                        </p>
                        <p>{student.parent_info.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Occupation
                        </p>
                        <p>{"Doctor"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Email
                        </p>
                        <p>{student.parent_info.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Phone
                        </p>
                        <p>{student.parent_info.contact_number}</p>
                      </div>
                    </div>
                  </div>

                  {/* <div>
                    <h3 className="mb-4 text-lg font-medium">
                      Emergency Contact
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Name
                        </p>
                        <p>{student.parent_info.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Relationship
                        </p>
                        <p>{student.parent_info.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Phone
                        </p>
                        <p>{student.parent_info.phone}</p>
                      </div>
                    </div>
                  </div> */}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="academic">
              <StudentAcademic studentId={student.id} />
            </TabsContent>
            <TabsContent value="attendance">
              <StudentAttendanceCalendar studentId={student.id} />
            </TabsContent>
            <TabsContent value="fees">
              <StudentFees studentId={student.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
