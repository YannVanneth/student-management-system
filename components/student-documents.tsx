"use client";

import { FileText, Download, Eye, Upload } from "lucide-react";

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

interface StudentDocumentsProps {
  studentId: string;
}

export function StudentDocuments({ studentId }: StudentDocumentsProps) {
  // Mock documents data
  const documents = [
    {
      id: "DOC001",
      name: "Birth Certificate",
      type: "PDF",
      size: "1.2 MB",
      uploadedOn: "Aug 15, 2021",
      status: "Verified",
    },
    {
      id: "DOC002",
      name: "Previous School Records",
      type: "PDF",
      size: "3.5 MB",
      uploadedOn: "Aug 15, 2021",
      status: "Verified",
    },
    {
      id: "DOC003",
      name: "Medical Certificate",
      type: "PDF",
      size: "0.8 MB",
      uploadedOn: "Aug 20, 2021",
      status: "Verified",
    },
    {
      id: "DOC004",
      name: "ID Proof",
      type: "JPG",
      size: "0.5 MB",
      uploadedOn: "Aug 15, 2021",
      status: "Verified",
    },
    {
      id: "DOC005",
      name: "Address Proof",
      type: "PDF",
      size: "1.0 MB",
      uploadedOn: "Aug 15, 2021",
      status: "Pending",
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Student Documents</CardTitle>
          <CardDescription>View and manage student documents.</CardDescription>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Uploaded On</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{doc.name}</span>
                  </div>
                </TableCell>
                <TableCell>{doc.type}</TableCell>
                <TableCell>{doc.size}</TableCell>
                <TableCell>{doc.uploadedOn}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      doc.status === "Verified"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {doc.status}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
