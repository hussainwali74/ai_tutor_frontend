"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Class_Interface, SubjectInterface, TopicInterface } from "@/app/models/interfaces";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getSubjectSerice, getTopicSerice } from "@/lib/service";
import Image from "next/image";

export default function TopicCRUDPage() {
  const [classes, setClasses] = useState<Class_Interface[]>([]);
  const [Subject, setSubjects] = useState<SubjectInterface[]>([]);
  const [classSubjects, setClassSubjects] = useState<SubjectInterface[]>([]);
  const [topics, setTopics] = useState<TopicInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<TopicInterface | null>(null);

  const { control, register, handleSubmit, reset, setValue } =
    useForm<Omit<TopicInterface, "id" | "createdAt" | "updatedAt" | "deletedAt">>();

  useEffect(() => {
    fetchTopics();
  }, []);

  async function fetchClasses() {
    try {
      setFormLoading(true);
      const response = await fetch("/api/admin/class");
      if (!response.ok) throw new Error("Failed to fetch Classes");
      const fetchedClasses = await response.json();
      setClasses(fetchedClasses);
      console.log("-----------------------------------------------------");
      console.log("fetchedClasses", fetchedClasses);
      console.log("-----------------------------------------------------");
    } catch (err) {
      console.log("-----------------------------------------------------");
      console.log("err fetchClasses", err);
      console.log("-----------------------------------------------------");

      toast({
        variant: "destructive",
        title: "Oh Oh!",
        description: "Failed to fetch Classes ",
      });
    } finally {
      setFormLoading(false);
    }
  }

  async function fetchSubjects() {
    try {
      setLoading(true);
      const fetchedSubjects = await getSubjectSerice();
      setSubjects(fetchedSubjects);
    } catch (err) {
      console.log("-----------------------------------------------------");
      console.log("err fetchSubjects", err);
      console.log("-----------------------------------------------------");

      toast({
        variant: "destructive",
        title: "Oh Oh!",
        description: "Failed to fetch Subjects ",
      });
    } finally {
      setLoading(false);
    }
  }
  async function fetchClassSubjects(id: string) {
    try {
      setFormLoading(true);
      const response = await fetch("/api/admin/subject/by_class_id/" + id);
      if (!response.ok) throw new Error("Failed to fetch Classes");
      const fetchedSubjects = await response.json();
      if (fetchedSubjects.length) {
        setClassSubjects(fetchedSubjects);
      } else {
        toast({
          variant: "danger",
          title: "Oh Oh!",
          description: "No Subjects added for this class yet",
        });
      }
      console.log("-----------------------------------------------------");
      console.log("fetchedSubjects", fetchedSubjects);
      console.log("-----------------------------------------------------");
    } catch (err) {
      console.log("-----------------------------------------------------");
      console.log("err fetchClassSubjects", err);
      console.log("-----------------------------------------------------");

      toast({
        variant: "destructive",
        title: "Oh Oh!",
        description: "Failed to fetch the Subjects of the class ",
      });
    } finally {
      setFormLoading(false);
    }
  }
  async function fetchTopics() {
    try {
      setLoading(true);
      const fetchedTopics = await getTopicSerice();
      setTopics(fetchedTopics);
    } catch (err) {
      console.log("-----------------------------------------------------");
      console.log("err fetchTopics", err);
      console.log("-----------------------------------------------------");

      toast({
        variant: "destructive",
        title: "Oh Oh!",
        description: "Failed to fetch Topics ",
      });
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(data: Omit<TopicInterface, "id" | "createdAt" | "updatedAt" | "deletedAt">) {
    try {
      setLoading(true);
      const url = editingTopic ? `/api/admin/topic/${editingTopic.id}` : "/api/admin/topic";
      const method = editingTopic ? "PUT" : "POST";
      console.log("-----------------------------------------------------");
      console.log("url", url);
      console.log("-----------------------------------------------------");

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok)
        throw new Error(editingTopic ? "Failed to update subject/by_class_id" : "Failed to create class");

      await fetchTopics();

      setIsDialogOpen(false);

      reset();

      setEditingTopic(null);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Oh Oh!",
        description: editingTopic ? "Failed to update class" : "Failed to create class",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (window.confirm("Are you sure you want to delete this class?")) {
      try {
        setLoading(true);
        const response = await fetch(`/api/admin/topic/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete class");
        const x = await fetchSubjects();
      } catch (err) {
        console.log("-----------------------------------------------------");
        console.log("error", err);
        console.log("-----------------------------------------------------");

        toast({
          variant: "destructive",
          title: "Delete Subject Error",
          description: "Failed to delete Subject",
        });
        // setError('Failed to delete class');
      } finally {
        setLoading(false);
      }
    }
  }

  async function handleEdit(topic: TopicInterface) {
    console.log('-----------------------------------------------------');
    console.log('topic',topic);
    console.log('-----------------------------------------------------');
    
    setEditingTopic(topic);
    if(!editingTopic){

      await fetchClasses();
      setClassSubjects([]);
    }
    setValue("subject_id", topic.subject_id);
    setValue("title", topic.title);
    setValue("imageSrc", topic.imageSrc || "");
    setValue("summary", topic.summary || "");
    setValue("subject", topic.subject || "");
    setIsDialogOpen(true);
  }
  const { toast } = useToast();
  async function onChangeClass(e: string) {
    console.log("-----------------------------------------------------");
    console.log("e", e);
    console.log("-----------------------------------------------------");
    await fetchClassSubjects(e);
  }
  return (
    <div className="container w-full h-full p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Topic Management</h1>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={async () => {
              await fetchClasses();
              reset();
              setEditingTopic(null);
            }}
          >
            <Plus className="w-4 h-4 mr-2" /> Add New Topic
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle className="hidden">{editingTopic ? "Edit Topic" : "Add New Topic"}</DialogTitle>
          {loading && !topics.length ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            <>
              <DialogHeader></DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                {/* select class then subject */}
                <Select onValueChange={onChangeClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes?.map((cls) => (
                      <SelectItem key={cls?.id} value={cls.id?.toString() || "-"}>
                        {cls.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Controller
                  name="subject_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      disabled={!classSubjects.length && !editingTopic}
                      defaultValue={field.value?.toString()}
                      name={field.name}
                      onValueChange={field.onChange}
                      value={field.value?.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classSubjects.map((cls) => (
                          <SelectItem key={cls?.id} value={cls.id?.toString() || "-"}>
                            {cls.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                <Input
                  disabled={!classSubjects.length && !editingTopic}
                  {...register("title")}
                  placeholder="Topic Title"
                  required
                />
                <Textarea
                  disabled={!classSubjects.length && !editingTopic}
                  {...register("summary")}
                  placeholder="Topic Summary"
                  required
                />
                <Input disabled={!classSubjects.length && !editingTopic} {...register("imageSrc")} placeholder="Image URL" />
                <Button disabled={(!classSubjects.length || loading) && !editingTopic } className="w-full" type="submit">
                  {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingTopic ? "Update" : "Create"}
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>

      {loading && !topics.length ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <Table className="h-20 mt-6 overflow-scroll">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topics?.map((topic) => (
              <TableRow key={topic.id}>
                <TableCell>{topic.id}</TableCell>
                <TableCell>{topic.title}</TableCell>
                <TableCell>
                  {topic.imageSrc && (
                    <Image width={40} height={40} src={topic.imageSrc} alt={topic.title} className="object-cover w-10 h-10 rounded" />
                  )}
                </TableCell>
                <TableCell>{new Date(topic.createdAt || "").toLocaleString()}</TableCell>
                <TableCell>
                  <Button variant="default" size="sm" onClick={() => handleEdit(topic)} className="mr-2">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(topic.id!)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
