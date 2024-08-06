"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Class_ } from "@/db/schema";
import Image from "next/image";

type Class = {
  id: number;
  title: string;
  imageSrc: string | null;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
};

export default function ClassCRUDPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);

  const { register, handleSubmit, reset, setValue } =
    useForm<Omit<Class, "id" | "createdAt" | "updatedAt" | "deletedAt">>();

  useEffect(() => {
    fetchClasses();
  }, []);

  async function fetchClasses() {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/class");
      if (!response.ok) throw new Error("Failed to fetch classes");
      const fetchedClasses = await response.json();
      setClasses(fetchedClasses);
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
      setLoading(false);
    }
  }

  async function onSubmit(
    data: Omit<typeof Class_.$inferInsert, "id" | "createdAt" | "updatedAt" | "deletedAt">
  ) {
    try {
      setLoading(true);
      const url = editingClass ? `/api/admin/class/${editingClass.id}` : "/api/admin/class";
      const method = editingClass ? "PUT" : "POST";
      // TODO: change this to real admin_id
      data.admin_id = 1;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(editingClass ? "Failed to update class" : "Failed to create class");
      await fetchClasses();
      setIsDialogOpen(false);
      reset();
      setEditingClass(null);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Oh Oh!",
        description: editingClass ? "Failed to update class" : "Failed to create class",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (window.confirm("Are you sure you want to delete this class?")) {
      try {
        setLoading(true);
        const response = await fetch(`/api/admin/class/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete class");
        const x = await fetchClasses();
      } catch (err) {
        console.log("-----------------------------------------------------");
        console.log("error", err);
        console.log("-----------------------------------------------------");

        toast({
          variant: "destructive",
          title: "Delete Class Error",
          description: "Failed to delete Class",
        });
        // setError('Failed to delete class');
      } finally {
        setLoading(false);
      }
    }
  }

  function handleEdit(class_: Class) {
    setEditingClass(class_);
    setValue("title", class_.title);
    setValue("imageSrc", class_.imageSrc || "");
    setIsDialogOpen(true);
  }
  const { toast } = useToast();

  return (
    <div className="container h-full p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Class Management</h1>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              reset();
              setEditingClass(null);
            }}
          >
            <Plus className="w-4 h-4 mr-2" /> Add New Class
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingClass ? "Edit Class" : "Add New Class"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input {...register("title")} placeholder="Class Title" required />
            <Input {...register("imageSrc")} placeholder="Image URL" />
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editingClass ? "Update" : "Create"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {loading && !classes.length ? (
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
            {classes.map((class_) => (
              <TableRow key={class_.id}>
                <TableCell>{class_.id}</TableCell>
                <TableCell>{class_.title}</TableCell>
                <TableCell>
                  {class_.imageSrc && (
                    <Image
                      width={40}
                      height={40}
                      src={class_.imageSrc}
                      alt={class_.title}
                      className="object-cover w-10 h-10 rounded"
                    />
                  )}
                </TableCell>
                <TableCell>{new Date(class_.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Button variant="default" size="sm" onClick={() => handleEdit(class_)} className="mr-2">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(class_.id)}>
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
