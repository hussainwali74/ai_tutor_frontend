import { Class_, lesson, subject, topic } from "@/db/schema";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Props = {
  loading: boolean;
  lessons: (typeof lesson.$inferSelect)[];
  handleEdit: (edit_lesson: typeof lesson.$inferSelect) => void;
  handleDelete: (lesson_id: number) => void;
  subjects: (typeof subject.$inferSelect)[];
  topics: (typeof topic.$inferSelect)[];
};

export default function LessonsListComponent({
  loading,
  subjects,
  topics,
  lessons,
  handleEdit,
  handleDelete,
}: Props) {
        
  return loading && !topics.length ? (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  ) : (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Summary</TableHead>
          {/* <TableHead>Subject</TableHead> */}
          <TableHead>Topic</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {lessons.map((lesson) => (
          <TableRow key={lesson.id}>
            <TableCell>{lesson.title}</TableCell>
            <TableCell>{lesson.summary}</TableCell>
            <TableCell>{subjects.find((s) => s.id === lesson.topic_id)?.title || "Loading..."}</TableCell>
            <TableCell>
              <Button variant="primary" size="icon" className="mr-2" onClick={() => handleEdit(lesson)}>
                <Pencil className="w-4 h-4" />
              </Button>
              <Button variant="danger" size="icon" onClick={() => handleDelete(lesson.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
