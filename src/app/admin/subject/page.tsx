"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Class_Interface, SubjectInterface } from "@/app/models/interfaces";

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
import SubjectListComponent from "./subject_list.component";

export default function SubjectCRUDPage() {
  const [classes, setClasses] = useState<Class_Interface[]>([]);
  const [Subject, setSubjects] = useState<SubjectInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<SubjectInterface | null>(null);

  const { control, register, handleSubmit, reset, setValue } =
    useForm<Omit<SubjectInterface, "id" | "createdAt" | "updatedAt" | "deletedAt">>();

  useEffect(() => {
    fetchSubjects();
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
      const response = await fetch("/api/admin/subject");
      if (!response.ok) throw new Error("Failed to fetch Subject");
      const fetchedSubjects = await response.json();
      console.log('-----------------------------------------------------');
      console.log('fetchedSubjects',fetchedSubjects);
      console.log('-----------------------------------------------------');
      
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

  async function onSubmit(data: Omit<SubjectInterface, "id" | "createdAt" | "updatedAt" | "deletedAt">) {
    try {
      setLoading(true);
      const url = editingSubject ? `/api/admin/subject/${editingSubject.id}` : "/api/admin/subject";
      const method = editingSubject ? "PUT" : "POST";
      console.log("-----------------------------------------------------");
      console.log("url", url);
      console.log("-----------------------------------------------------");

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(editingSubject ? "Failed to update class" : "Failed to create class");
      await fetchSubjects();
      setIsDialogOpen(false);
      reset();
      setEditingSubject(null);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Oh Oh!",
        description: editingSubject ? "Failed to update class" : "Failed to create class",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (window.confirm("Are you sure you want to delete this class?")) {
      try {
        setLoading(true);
        const response = await fetch(`/api/admin/subject/${id}`, { method: "DELETE" });
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

  function handleEdit(subject: SubjectInterface) {
    setEditingSubject(subject);
    setValue("class_id", subject.class_id);
    setValue("title", subject.title);
    setValue("imageSrc", subject.imageSrc || "");
    setValue("summary", subject.summary || "");
    setIsDialogOpen(true);
  }
  const { toast } = useToast();

  return (
    <div className="container w-full h-full p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Subject Management</h1>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={async () => {
              await fetchClasses();
              reset();
              setEditingSubject(null);
            }}
          >
            <Plus className="w-4 h-4 mr-2" /> Add New Subject
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle className="hidden">{editingSubject ? "Edit Subject" : "Add New Subject"}</DialogTitle>
          {loading && !Subject.length ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            <>
              <DialogHeader></DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                <Controller
                  name="class_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      defaultValue={field.value?.toString()}
                      name={field.name}
                      onValueChange={field.onChange}
                      value={field.value?.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls?.id}  value={cls.id?.toString() || "-"}>
                            {cls.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                <Input {...register("title")} placeholder="Subject Title" required />
                <Textarea {...register("summary")} placeholder="Subject Summary" required />
                <Input {...register("imageSrc")} placeholder="Image URL" />
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingSubject ? "Update" : "Create"}
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>

      {loading && !Subject.length ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <SubjectListComponent handleDelete={handleDelete} handleEdit={handleEdit} Subjects={Subject} />
      )}
    </div>
  );
}
