"use client";

import { useState } from "react";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
  Grid,
  List,
} from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addDays,
} from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AttendanceDayView } from "@/components/attendance-day-view";
import { AttendanceStats } from "@/components/attendance-stats";

// Mock attendance data
const generateMockAttendance = (startDate: Date, days: number) => {
  const result: Record<string, string> = {};

  for (let i = 0; i < days; i++) {
    const date = format(addDays(startDate, i), "yyyy-MM-dd");
    // Generate random status, with higher probability for "present"
    const rand = Math.random();
    let status;
    if (rand < 0.8) status = "present";
    else if (rand < 0.9) status = "absent";
    else if (rand < 0.95) status = "late";
    else status = "excused";

    result[date] = status;
  }

  return result;
};

// Generate 3 months of mock data
const today = new Date();
const threeMonthsAgo = subMonths(today, 2);
const mockAttendanceData = generateMockAttendance(threeMonthsAgo, 90);

interface StudentAttendanceCalendarProps {
  studentId: string;
}

export function StudentAttendanceCalendar({
  studentId,
}: StudentAttendanceCalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [attendanceData, setAttendanceData] =
    useState<Record<string, string>>(mockAttendanceData);

  // Get days for the current month view
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  // Get days for the current week view
  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());

  const daysInWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextWeek = () => {
    const nextWeekDate = new Date(selectedDate);
    nextWeekDate.setDate(selectedDate.getDate() + 7);
    setSelectedDate(nextWeekDate);
  };

  const prevWeek = () => {
    const prevWeekDate = new Date(selectedDate);
    prevWeekDate.setDate(selectedDate.getDate() - 7);
    setSelectedDate(prevWeekDate);
  };

  const nextDay = () => {
    const nextDayDate = new Date(selectedDate);
    nextDayDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(nextDayDate);
  };

  const prevDay = () => {
    const prevDayDate = new Date(selectedDate);
    prevDayDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(prevDayDate);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setView("day");
    }
  };

  const getAttendanceStatus = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return attendanceData[dateString] || "unknown";
  };

  const updateAttendanceStatus = (date: Date, status: string) => {
    const dateString = format(date, "yyyy-MM-dd");
    setAttendanceData({
      ...attendanceData,
      [dateString]: status,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "absent":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "late":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "excused":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Student Attendance Records</CardTitle>
            <CardDescription>
              Track and manage student attendance records
            </CardDescription>
          </div>
          <div className="mt-4 flex items-center space-x-2 sm:mt-0">
            <Tabs
              defaultValue={view}
              onValueChange={(v) => setView(v as "month" | "week" | "day")}
            >
              <TabsList>
                <TabsTrigger value="month">
                  <Grid className="mr-2 h-4 w-4" />
                  Month
                </TabsTrigger>
                <TabsTrigger value="week">
                  <List className="mr-2 h-4 w-4" />
                  Week
                </TabsTrigger>
                <TabsTrigger value="day">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Day
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <AttendanceStats
            studentId={studentId}
            attendanceData={attendanceData}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {view === "month" && (
                <>
                  <Button variant="outline" size="icon" onClick={prevMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="min-w-[240px] justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(currentDate, "MMMM yyyy")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={currentDate}
                        onSelect={(date) => date && setCurrentDate(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Button variant="outline" size="icon" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
              {view === "week" && (
                <>
                  <Button variant="outline" size="icon" onClick={prevWeek}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="min-w-[240px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(daysInWeek[0], "MMM d")} -{" "}
                    {format(daysInWeek[6], "MMM d, yyyy")}
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextWeek}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
              {view === "day" && (
                <>
                  <Button variant="outline" size="icon" onClick={prevDay}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="min-w-[240px] justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(selectedDate, "EEEE, MMMM d, yyyy")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => date && setSelectedDate(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Button variant="outline" size="icon" onClick={nextDay}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                  <SelectItem value="excused">Excused</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {view === "month" && (
            <div className="rounded-md border">
              <div className="grid grid-cols-7 gap-px bg-muted">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="bg-background p-3 text-center text-sm font-medium"
                    >
                      {day}
                    </div>
                  )
                )}
              </div>
              <div className="grid grid-cols-7 gap-px bg-muted">
                {daysInMonth.map((day, i) => {
                  const isCurrentMonth = isSameMonth(day, currentDate);
                  const isToday = isSameDay(day, new Date());
                  const status = getAttendanceStatus(day);

                  return (
                    <div
                      key={i}
                      className={cn(
                        "min-h-[100px] bg-background p-2",
                        !isCurrentMonth && "text-muted-foreground opacity-50",
                        isToday && "bg-accent"
                      )}
                      onClick={() => handleDateSelect(day)}
                    >
                      <div className="flex items-center justify-between">
                        <span className={cn("text-sm", isToday && "font-bold")}>
                          {format(day, "d")}
                        </span>
                        {status !== "unknown" && (
                          <Badge
                            className={cn("text-xs", getStatusColor(status))}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {view === "week" && (
            <div className="rounded-md border">
              <div className="grid grid-cols-7 gap-px bg-muted">
                {daysInWeek.map((day, i) => (
                  <div key={i} className="bg-background p-3 text-center">
                    <div className="text-sm font-medium">
                      {format(day, "EEE")}
                    </div>
                    <div
                      className={cn(
                        "text-lg",
                        isSameDay(day, new Date()) && "font-bold text-primary"
                      )}
                    >
                      {format(day, "d")}
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-px bg-muted">
                {daysInWeek.map((day, i) => {
                  const status = getAttendanceStatus(day);
                  return (
                    <div
                      key={i}
                      className="min-h-[120px] bg-background p-2"
                      onClick={() => {
                        setSelectedDate(day);
                        setView("day");
                      }}
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        {status !== "unknown" ? (
                          <Badge
                            className={cn(
                              "mb-2 px-3 py-1",
                              getStatusColor(status)
                            )}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="mb-2 px-3 py-1">
                            Not Marked
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDate(day);
                            setView("day");
                          }}
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {view === "day" && (
            <AttendanceDayView
              date={selectedDate}
              status={getAttendanceStatus(selectedDate)}
              onStatusChange={(status) =>
                updateAttendanceStatus(selectedDate, status)
              }
            />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Export Attendance</Button>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
