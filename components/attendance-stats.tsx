"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface AttendanceStatsProps {
  studentId: string;
  attendanceData: Record<string, string>;
}

export function AttendanceStats({
  studentId,
  attendanceData,
}: AttendanceStatsProps) {
  // Calculate attendance statistics
  const stats = useMemo(() => {
    const counts = {
      present: 0,
      absent: 0,
      late: 0,
      excused: 0,
      total: 0,
    };

    Object.values(attendanceData).forEach((status) => {
      if (status in counts) {
        counts[status as keyof typeof counts]++;
        counts.total++;
      }
    });

    return {
      present: counts.present,
      absent: counts.absent,
      late: counts.late,
      excused: counts.excused,
      total: counts.total,
      presentPercentage:
        counts.total > 0 ? (counts.present / counts.total) * 100 : 0,
      absentPercentage:
        counts.total > 0 ? (counts.absent / counts.total) * 100 : 0,
      latePercentage: counts.total > 0 ? (counts.late / counts.total) * 100 : 0,
      excusedPercentage:
        counts.total > 0 ? (counts.excused / counts.total) * 100 : 0,
    };
  }, [attendanceData]);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Present</span>
              <span className="text-sm font-medium">
                {stats.present} days ({Math.round(stats.presentPercentage)}%)
              </span>
            </div>
            <Progress
              value={stats.presentPercentage}
              className="h-2 bg-gray-100"
              indicatorClassName="bg-green-500"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Absent</span>
              <span className="text-sm font-medium">
                {stats.absent} days ({Math.round(stats.absentPercentage)}%)
              </span>
            </div>
            <Progress
              value={stats.absentPercentage}
              className="h-2 bg-gray-100"
              indicatorClassName="bg-red-500"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Late</span>
              <span className="text-sm font-medium">
                {stats.late} days ({Math.round(stats.latePercentage)}%)
              </span>
            </div>
            <Progress
              value={stats.latePercentage}
              className="h-2 bg-gray-100"
              indicatorClassName="bg-yellow-500"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Excused</span>
              <span className="text-sm font-medium">
                {stats.excused} days ({Math.round(stats.excusedPercentage)}%)
              </span>
            </div>
            <Progress
              value={stats.excusedPercentage}
              className="h-2 bg-gray-100"
              indicatorClassName="bg-blue-500"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
