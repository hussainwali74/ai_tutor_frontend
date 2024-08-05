"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Pencil, Trash2, Plus } from "lucide-react";
import TopicsListComponent from "./lessons_list.component";
import { topic, Class_, subject, lesson } from "@/db/schema";
import { SubjectInterface } from "@/app/models/interfaces";
import LessonsListComponent from "./lessons_list.component";

export default function TopicCRUDPage() {
  const [classes, setClasses] = useState<(typeof Class_.$inferSelect)[]>([]);
  const [subjects, setSubjects] = useState<(typeof subject.$inferSelect)[]>([]);
  const [topics, setTopics] = useState<(typeof topic.$inferSelect)[]>([]);
  const [lessons, setLessons] = useState<(typeof lesson.$inferSelect)[]>([]);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [newLesson, setNewLesson] = useState<Omit<typeof lesson.$inferInsert, "id">>({
    title: "",
    imageSrc: "",
    summary: "",
    topic_id: 0,
  });
  const [editingLesson, setEditingTopic] = useState<Omit<
    typeof topic.$inferInsert,
    "created_at" | "createdAt" | "updatedAt" | "deletedAt"
  > | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!classes.length) {
      fetchClasses();
    }
    if (!subjects.length) {
      fetchSubjects();
    }
    if (!topics.length) {
      fetchTopics();
    }
    if (!lessons.length) {
      fetchLessons();
    }
  }, []);

  useEffect(() => {
    if (selectedClass) {
      fetchSubjects(selectedClass);
    }
  }, [selectedClass]);

  const fetchClasses = async () => {
    if (!classes.length) {
      const response = await fetch("/api/admin/class");
      const data = await response.json();
      console.log("-----------------------------------------------------");
      console.log("data classes fetching", data);
      console.log("-----------------------------------------------------");

      if (data.length) {
        setClasses(data);
      }
    }
  };

  const fetchSubjects = async (classId?: number) => {
    if (classId) {
      const response = await fetch(`/api/admin/subject/by_class_id/${classId}`);
      const data: (typeof subject.$inferSelect)[] = await response.json();
      setSubjects(data);
    } else {
      const response = await fetch(`/api/admin/subject`);
      const data: (typeof subject.$inferSelect)[] = await response.json();
      setSubjects(data);
    }
  };

  const fetchTopics = async (id?: any) => {
    setLoading(true);
    if (id) {
      const response = await fetch(`/api/admin/topic/by_subject_id/${id}`);
      const data: (typeof topic.$inferSelect)[] = await response.json();
      console.log("-----------------------------------------------------");
      console.log("topics by subjectid", topics);
      console.log("-----------------------------------------------------");

      setTopics(data);
    } else {
      const response = await fetch("/api/admin/topic");
      const data: (typeof topic.$inferSelect)[] = await response.json();
      if (data.length) {
        setTopics(data);
      }
    }
    setLoading(false);
  };

  const fetchLessons = async () => {
    setLoading(true);
    const response = await fetch("/api/admin/lesson");
    const data: (typeof lesson.$inferSelect)[] = await response.json();
    if (data.length) {
      setLessons(data);
    }
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editingLesson) {
      setEditingTopic({ ...editingLesson, [name]: value });
    } else {
      setNewLesson({ ...newLesson, [name]: value });
    }
  };

  const handleClassChange = (value: string) => {
    setSelectedClass(parseInt(value));
    setSelectedSubject(null);
  };

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(parseInt(value));
    setSelectedTopic(null);
    fetchTopics(value);
  };

  const handleTopicChange = (value: string) => {
    console.log("-----------------------------------------------------");
    console.log("value handleTopicCHange", value);
    console.log("-----------------------------------------------------");

    setSelectedTopic(parseInt(value));
    if (editingLesson) {
      // setEditingTopic({ ...editingLesson, topic_id: parseInt(value) });
    } else {
      setNewLesson({ ...newLesson, topic_id: parseInt(value) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingLesson ? `/api/admin/lesson/${editingLesson.id}` : "/api/admin/lesson";
    const method = editingLesson ? "PUT" : "POST";

    const lessonData = editingLesson || newLesson;

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lessonData),
    });

    if (response.ok) {
      toast({
        title: `Lesson ${editingLesson ? "updated" : "created"} successfully`,
        duration: 3000,
      });
      setNewLesson({ title: "", imageSrc: "", summary: "", topic_id: 0 });
      setEditingTopic(null);
      setIsDialogOpen(false);
      fetchLessons();
    }
  };

  const handleEdit = async (edit_lesson: typeof lesson.$inferSelect) => {
    const lessonResponse = await fetch(`/api/admin/lesson/${topic.subject_id}`);
    const lessond: typeof subject.$inferSelect = await lessonResponse.json();
    setSelectedClass(lessond.class_id!);
    await fetchSubjects(lessond.class_id!);
    setSelectedSubject(edit_lesson.topic_id);
    setEditingTopic(edit_lesson);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    const response = await fetch(`/api/admin/lesson/${id}`, { method: "DELETE" });
    if (response.ok) {
      toast({
        title: "Topic deleted successfully",
        duration: 3000,
      });
      fetchTopics();
    }
  };

  const handleButtonClick = async (e: any) => {
    setEditingTopic(null);
    setSelectedClass(null);
    setSelectedSubject(null);
  };

  return (
    <div className="container p-4 mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Lesson Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mb-4" onClick={handleButtonClick}>
                <Plus className="w-4 h-4 mr-2" /> Add New Lesson
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingLesson ? "Edit Topic" : "Add New Lesson"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Select onValueChange={handleClassChange} value={selectedClass?.toString()}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((class_) => (
                      <SelectItem key={class_.id} value={class_.id.toString()}>
                        {class_.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  onValueChange={handleSubjectChange}
                  value={selectedSubject?.toString()}
                  disabled={!selectedClass}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id.toString()}>
                        {subject.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  onValueChange={handleTopicChange}
                  value={selectedTopic?.toString()}
                  disabled={!topics.length && !selectedSubject}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map((topic) => (
                      <SelectItem key={topic.id} value={topic.id.toString()}>
                        {topic.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  name="title"
                  placeholder="Title"
                  value={editingLesson?.title || newLesson.title}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  name="imageSrc"
                  placeholder="Image Source"
                  value={editingLesson?.imageSrc || newLesson.imageSrc || ""}
                  onChange={handleInputChange}
                />
                <Textarea
                  name="summary"
                  placeholder="Summary"
                  value={editingLesson?.summary || newLesson.summary || ""}
                  onChange={handleInputChange}
                />
                <Button type="submit" disabled={!selectedSubject}>
                  {editingLesson ? "Update" : "Create"} Topic
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <LessonsListComponent
            loading={isLoading}
            subjects={subjects}
            topics={topics}
            lessons={lessons}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </div>
  );
}
