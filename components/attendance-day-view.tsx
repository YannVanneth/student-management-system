"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Clock, User } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AttendanceDayViewProps {
  date: Date;
  status: string;
  onStatusChange: (status: string) => void;
}

export function AttendanceDayView({
  date,
  status,
  onStatusChange,
}: AttendanceDayViewProps) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [notes, setNotes] = useState("");
  const [arrivalTime, setArrivalTime] = useState(
    status === "late" ? "08:15" : "08:00"
  );

  const handleStatusChange = (value: string) => {
    setCurrentStatus(value);
    onStatusChange(value);
  };

  // Mock student data
  const student = {
    id: "ST001",
    name: "Emma Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    grade: "10",
    section: "A",
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            Attendance for {format(date, "EEEE, MMMM d, yyyy")}
          </CardTitle>
          <CardDescription>
            Mark and manage attendance for this day
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-6">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={student.avatar || "/placeholder.svg"}
                    alt={student.name}
                  />
                  <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{student.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Grade {student.grade} - Section {student.section}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Attendance Status
                  </h3>
                  <RadioGroup
                    value={currentStatus}
                    onValueChange={handleStatusChange}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="present" id="present" />
                      <Label htmlFor="present" className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                        Present
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="absent" id="absent" />
                      <Label htmlFor="absent" className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                        Absent
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="late" id="late" />
                      <Label htmlFor="late" className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                        Late
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="excused" id="excused" />
                      <Label htmlFor="excused" className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                        Excused
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {(currentStatus === "present" || currentStatus === "late") && (
                  <div>
                    <Label
                      htmlFor="arrival-time"
                      className="text-sm font-medium"
                    >
                      Arrival Time
                    </Label>
                    <div className="flex items-center mt-1">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="arrival-time"
                        type="time"
                        value={arrivalTime}
                        onChange={(e) => setArrivalTime(e.target.value)}
                        className="w-32"
                      />
                    </div>
                  </div>
                )}

                {(currentStatus === "absent" ||
                  currentStatus === "excused") && (
                  <div>
                    <Label htmlFor="reason" className="text-sm font-medium">
                      Reason
                    </Label>
                    <Textarea
                      id="reason"
                      placeholder="Enter reason for absence or excuse"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-medium mb-4">Attendance History</h3>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Marked by</span>
                    </div>
                    <span className="text-sm">John Smith (Teacher)</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Marked at</span>
                    </div>
                    <span className="text-sm">08:30 AM</span>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <h4 className="text-sm font-medium mb-2">
                    Previous Week Attendance
                  </h4>
                  <div className="grid grid-cols-7 gap-1">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <span className="text-xs text-muted-foreground">
                          {day}
                        </span>
                        <div
                          className={`h-2 w-2 rounded-full mt-1 ${
                            i < 5
                              ? i === 2
                                ? "bg-yellow-500"
                                : "bg-green-500"
                              : i === 5
                              ? "bg-gray-300"
                              : "bg-red-500"
                          }`}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <h4 className="text-sm font-medium mb-2">
                    Monthly Statistics
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Present</span>
                      <span className="text-xs font-medium">18 days (90%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Absent</span>
                      <span className="text-xs font-medium">1 day (5%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Late</span>
                      <span className="text-xs font-medium">1 day (5%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
