"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface StudentAcademicProps {
  studentId: string;
}

export function StudentAcademic({ studentId }: StudentAcademicProps) {
  // Mock academic data
  const examResults = [
    {
      term: "First Term",
      subjects: [
        {
          name: "Mathematics",
          marks: 85,
          grade: "A",
          passingMarks: 40,
          totalMarks: 100,
        },
        {
          name: "Science",
          marks: 78,
          grade: "B+",
          passingMarks: 40,
          totalMarks: 100,
        },
        {
          name: "English",
          marks: 92,
          grade: "A+",
          passingMarks: 40,
          totalMarks: 100,
        },
        {
          name: "History",
          marks: 75,
          grade: "B",
          passingMarks: 40,
          totalMarks: 100,
        },
        {
          name: "Geography",
          marks: 80,
          grade: "A-",
          passingMarks: 40,
          totalMarks: 100,
        },
      ],
      totalMarks: 410,
      percentage: 82,
      grade: "A-",
      rank: 5,
    },
    {
      term: "Mid Term",
      subjects: [
        {
          name: "Mathematics",
          marks: 90,
          grade: "A+",
          passingMarks: 40,
          totalMarks: 100,
        },
        {
          name: "Science",
          marks: 82,
          grade: "A-",
          passingMarks: 40,
          totalMarks: 100,
        },
        {
          name: "English",
          marks: 88,
          grade: "A",
          passingMarks: 40,
          totalMarks: 100,
        },
        {
          name: "History",
          marks: 78,
          grade: "B+",
          passingMarks: 40,
          totalMarks: 100,
        },
        {
          name: "Geography",
          marks: 85,
          grade: "A",
          passingMarks: 40,
          totalMarks: 100,
        },
      ],
      totalMarks: 423,
      percentage: 84.6,
      grade: "A",
      rank: 3,
    },
  ];

  const assignments = [
    {
      id: "ASG001",
      title: "Mathematics Problem Set",
      subject: "Mathematics",
      assignedDate: "Sep 10, 2023",
      dueDate: "Sep 17, 2023",
      status: "Submitted",
      grade: "A",
      score: 92,
    },
    {
      id: "ASG002",
      title: "Science Lab Report",
      subject: "Science",
      assignedDate: "Sep 15, 2023",
      dueDate: "Sep 25, 2023",
      status: "Submitted",
      grade: "A-",
      score: 88,
    },
    {
      id: "ASG003",
      title: "English Essay",
      subject: "English",
      assignedDate: "Sep 20, 2023",
      dueDate: "Oct 1, 2023",
      status: "Pending",
      grade: "-",
      score: null,
    },
  ];

  return (
    <Tabs defaultValue="results" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="results">Exam Results</TabsTrigger>
        <TabsTrigger value="assignments">Assignments</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
      </TabsList>
      <TabsContent value="results">
        <Card>
          <CardHeader>
            <CardTitle>Exam Results</CardTitle>
            <CardDescription>
              {"View student's performance in examinations."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="first-term">
              <TabsList className="mb-4">
                {examResults.map((result) => (
                  <TabsTrigger
                    key={result.term}
                    value={result.term.toLowerCase().replace(" ", "-")}
                  >
                    {result.term}
                  </TabsTrigger>
                ))}
              </TabsList>

              {examResults.map((result, index) => (
                <TabsContent
                  key={index}
                  value={result.term.toLowerCase().replace(" ", "-")}
                >
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">
                            Total Marks
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {result.totalMarks}/500
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">
                            Percentage
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {result.percentage}%
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">
                            Grade & Rank
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {result.grade} (Rank: {result.rank})
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subject</TableHead>
                          <TableHead className="text-right">Marks</TableHead>
                          <TableHead className="text-right">Grade</TableHead>
                          <TableHead className="text-right">
                            Performance
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {result.subjects.map((subject, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">
                              {subject.name}
                            </TableCell>
                            <TableCell className="text-right">
                              {subject.marks}/{subject.totalMarks}
                            </TableCell>
                            <TableCell className="text-right">
                              {subject.grade}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Progress
                                  value={
                                    (subject.marks / subject.totalMarks) * 100
                                  }
                                  className="h-2 w-[60px]"
                                />
                                <span className="w-8 text-xs">
                                  {Math.round(
                                    (subject.marks / subject.totalMarks) * 100
                                  )}
                                  %
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="assignments">
        <Card>
          <CardHeader>
            <CardTitle>Assignments</CardTitle>
            <CardDescription>
              {"View student's assignments and submissions."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell className="font-medium">
                      {assignment.title}
                    </TableCell>
                    <TableCell>{assignment.subject}</TableCell>
                    <TableCell>{assignment.dueDate}</TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          assignment.status === "Submitted"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {assignment.status}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {assignment.grade}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="performance">
        <Card>
          <CardHeader>
            <CardTitle>Academic Performance</CardTitle>
            <CardDescription>
              {"View student's overall academic performance."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-lg font-medium">
                  Subject Performance
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Mathematics</span>
                      <span className="text-sm font-medium">90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Science</span>
                      <span className="text-sm font-medium">82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">English</span>
                      <span className="text-sm font-medium">88%</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">History</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Geography</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-medium">
                  Term-wise Performance
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">First Term</span>
                      <span className="text-sm font-medium">82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Mid Term</span>
                      <span className="text-sm font-medium">84.6%</span>
                    </div>
                    <Progress value={84.6} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Class Rank
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3rd</div>
                    <p className="text-xs text-muted-foreground">
                      Out of 30 students
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Average Grade
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">A</div>
                    <p className="text-xs text-muted-foreground">
                      Consistent performance
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Attendance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">95%</div>
                    <p className="text-xs text-muted-foreground">
                      Excellent attendance
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
