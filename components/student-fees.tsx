"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { CreditCard, Receipt } from "lucide-react";

interface StudentFeesProps {
  studentId: string;
}

export function StudentFees({ studentId }: StudentFeesProps) {
  // Mock fees data
  const feesOverview = {
    totalFees: 12000,
    paid: 8000,
    due: 4000,
    nextDueDate: "Nov 15, 2023",
  };

  const feeTransactions = [
    {
      id: "TXN001",
      date: "Aug 10, 2023",
      amount: 4000,
      mode: "Online",
      status: "Paid",
      receiptNo: "REC-2023-001",
    },
    {
      id: "TXN002",
      date: "Sep 12, 2023",
      amount: 4000,
      mode: "Bank Transfer",
      status: "Paid",
      receiptNo: "REC-2023-002",
    },
    {
      id: "TXN003",
      date: "Nov 15, 2023",
      amount: 4000,
      mode: "-",
      status: "Pending",
      receiptNo: "-",
    },
  ];

  const feeStructure = [
    { type: "Tuition Fee", amount: 8000 },
    { type: "Development Fee", amount: 2000 },
    { type: "Library Fee", amount: 1000 },
    { type: "Computer Lab Fee", amount: 1000 },
    { type: "Total", amount: 12000 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fee Details</CardTitle>
        <CardDescription>
          {"View student's fee details and payment history."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${feesOverview.totalFees}
              </div>
              <p className="text-xs text-muted-foreground">
                Academic Year 2023-24
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${feesOverview.paid}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((feesOverview.paid / feesOverview.totalFees) * 100)}
                % of total fees
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Due Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${feesOverview.due}</div>
              <p className="text-xs text-muted-foreground">
                Next due date: {feesOverview.nextDueDate}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Payment Progress</h3>
          <div className="flex items-center gap-2">
            <Progress
              value={(feesOverview.paid / feesOverview.totalFees) * 100}
              className="h-2"
            />
            <span className="text-sm font-medium">
              {Math.round((feesOverview.paid / feesOverview.totalFees) * 100)}%
            </span>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-medium">Fee Structure</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fee Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feeStructure.map((fee, index) => (
                <TableRow
                  key={index}
                  className={fee.type === "Total" ? "font-bold" : ""}
                >
                  <TableCell>{fee.type}</TableCell>
                  <TableCell className="text-right">${fee.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Payment History</h3>
            <Button variant="outline" size="sm">
              <CreditCard className="mr-2 h-4 w-4" />
              Pay Fees
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Mode</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feeTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>${transaction.amount}</TableCell>
                  <TableCell>{transaction.mode}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        transaction.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {transaction.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    {transaction.status === "Paid" ? (
                      <Button variant="ghost" size="sm">
                        <Receipt className="mr-2 h-4 w-4" />
                        {transaction.receiptNo}
                      </Button>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
