import { Class_, subject, topic } from "@/db/schema";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Props = {
  loading: boolean;
  topics: (typeof topic.$inferSelect)[];
  handleEdit: (edit_topic: typeof topic.$inferSelect) => void;
  handleDelete: (topic_id: number) => void;
  subjects: (typeof subject.$inferSelect)[];
  classes: (typeof Class_.$inferSelect)[];
};

export default function TopicsListComponent({
  loading,
  classes,
  subjects,
  topics,
  handleEdit,
  handleDelete,
}: Props) {
    
    console.log('-----------------------------------------------------');
    console.log('classes',classes);
    console.log('-----------------------------------------------------');
    
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
          <TableHead>Subject</TableHead>
          <TableHead>Class</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {topics.map((topic) => (
          <TableRow key={topic.id}>
            <TableCell>{topic.title}</TableCell>
            <TableCell>{topic.summary}</TableCell>
            <TableCell>{subjects.find((s) => s.id === topic.subject_id)?.title || "Loading..."}</TableCell>
            <TableCell>
              {classes.find((c) => c.id === subjects.find((s) => s.id === topic.subject_id)?.class_id)
                ?.title || "Loading..."}
            </TableCell>
            <TableCell>
              <Button variant="primary" size="icon" className="mr-2" onClick={() => handleEdit(topic)}>
                <Pencil className="w-4 h-4" />
              </Button>
              <Button variant="danger" size="icon" onClick={() => handleDelete(topic.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
