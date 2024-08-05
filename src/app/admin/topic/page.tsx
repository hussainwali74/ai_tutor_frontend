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
import TopicsListComponent from "./topics_list.component";
import { topic, Class_, subject } from "@/db/schema";
import { SubjectInterface } from "@/app/models/interfaces";

export default function TopicCRUDPage() {
  const [classes, setClasses] = useState<(typeof Class_.$inferSelect)[]>([]);
  const [subjects, setSubjects] = useState<(typeof subject.$inferSelect)[]>([]);
  const [topics, setTopics] = useState<(typeof topic.$inferSelect)[]>([]);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
  const [newTopic, setNewTopic] = useState<Omit<typeof topic.$inferInsert, "id">>({
    title: "",
    imageSrc: "",
    summary: "",
    subject_id: 0,
  });
  const [editingTopic, setEditingTopic] = useState<Omit<
    typeof topic.$inferInsert,
    "created_at" | "createdAt" | "updatedAt" | "deletedAt"
  > | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTopicsLoading, setIsTopicsLoading] = useState(false);

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
  }, []);

  useEffect(() => {
    if (selectedClass) {
      fetchSubjects(selectedClass);
    }
  }, [selectedClass]);

  const fetchClasses = async () => {
    const response = await fetch("/api/admin/class");
    const data = await response.json();
    console.log("-----------------------------------------------------");
    console.log("data classes fetching", data);
    console.log("-----------------------------------------------------");

    if (data.length) {
      setClasses(data);
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

  const fetchTopics = async () => {
    setIsTopicsLoading(true);
    const response = await fetch("/api/admin/topic");
    const data: (typeof topic.$inferSelect)[] = await response.json();
    if (data.length) {
      setTopics(data);
    }
    setIsTopicsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editingTopic) {
      setEditingTopic({ ...editingTopic, [name]: value });
    } else {
      setNewTopic({ ...newTopic, [name]: value });
    }
  };

  const handleClassChange = (value: string) => {
    setSelectedClass(parseInt(value));
    setSelectedSubject(null);
  };

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(parseInt(value));
    if (editingTopic) {
      setEditingTopic({ ...editingTopic, subject_id: parseInt(value) });
    } else {
      setNewTopic({ ...newTopic, subject_id: parseInt(value) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingTopic ? `/api/admin/topic/${editingTopic.id}` : "/api/admin/topic";
    const method = editingTopic ? "PUT" : "POST";

    const topicData = editingTopic || newTopic;

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(topicData),
    });

    if (response.ok) {
      toast({
        title: `Topic ${editingTopic ? "updated" : "created"} successfully`,
        duration: 3000,
      });
      setNewTopic({ title: "", imageSrc: "", summary: "", subject_id: 0 });
      setEditingTopic(null);
      setIsDialogOpen(false);
      fetchTopics();
    }
  };

  const handleEdit = async (edit_topic: typeof topic.$inferSelect) => {
    const subjectResponse = await fetch(`/api/admin/subject/${topic.subject_id}`);
    const subject_d: typeof subject.$inferSelect = await subjectResponse.json();
    setSelectedClass(subject_d.class_id!);
    await fetchSubjects(subject_d.class_id!);
    setSelectedSubject(edit_topic.subject_id);
    setEditingTopic(edit_topic);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    const response = await fetch(`/api/admin/topic/${id}`, { method: "DELETE" });
    if (response.ok) {
      toast({
        title: "Topic deleted successfully",
        duration: 3000,
      });
      fetchTopics();
    }
  };

  const handleButtonClick = async (e: any) => {
    console.log("-----------------------------------------------------");
    console.log("e", e);
    console.log("e", e.target);
    console.log("e", e.target.value);
    console.log("-----------------------------------------------------");
    setEditingTopic(null);
    setSelectedClass(null);
    setSelectedSubject(null);
    await fetchClasses();
  };

  return (
    <div className="container p-4 mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Topic Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mb-4" onClick={handleButtonClick}>
                <Plus className="w-4 h-4 mr-2" /> Add New Topic
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingTopic ? "Edit Topic" : "Add New Topic"}</DialogTitle>
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

                <Input
                  name="title"
                  placeholder="Title"
                  value={editingTopic?.title || newTopic.title}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  name="imageSrc"
                  placeholder="Image Source"
                  value={editingTopic?.imageSrc || newTopic.imageSrc || ""}
                  onChange={handleInputChange}
                />
                <Textarea
                  name="summary"
                  placeholder="Summary"
                  value={editingTopic?.summary || newTopic.summary || ""}
                  onChange={handleInputChange}
                />
                <Button type="submit" disabled={!selectedSubject}>
                  {editingTopic ? "Update" : "Create"} Topic
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <TopicsListComponent
            classes={classes}
            subjects={subjects}
            loading={isTopicsLoading}
            topics={topics}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </div>
  );
}
