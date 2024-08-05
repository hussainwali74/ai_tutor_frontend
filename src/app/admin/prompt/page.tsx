"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { prompt } from "@/db/schema";
import { Textarea } from "@/components/ui/textarea";

export default function PromptCRUDPage() {
  const [promptState, setPromptState] = useState<(typeof prompt.$inferSelect)[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<typeof prompt.$inferInsert | null>(null);

  const { register, handleSubmit, reset, setValue } =
    useForm<Omit<typeof prompt.$inferInsert, "id" | "createdAt" | "updatedAt" | "deletedAt">>();

  useEffect(() => {
    fetchPrompts();    
  }, []);

  async function fetchPrompts() {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/prompt");
      if (!response.ok) throw new Error("Failed to fetch promptState");
      const fetchedPrompts = await response.json();
      console.log("-----------------------------------------------------");
      console.log("fetchedPrompts", fetchedPrompts);
      console.log("-----------------------------------------------------");

      setPromptState(fetchedPrompts);
    } catch (err) {
      console.log("-----------------------------------------------------");
      console.log("err fetchPrompts", err);
      console.log("-----------------------------------------------------");

      toast({
        variant: "destructive",
        title: "Oh Oh!",
        description: "Failed to fetch Prompts ",
      });
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(
    data: Omit<typeof prompt.$inferInsert, "id" | "createdAt" | "updatedAt" | "deletedAt">
  ) {
    try {
      setLoading(true);
      const url = editingPrompt ? `/api/admin/prompt/${editingPrompt.id}` : "/api/admin/prompt";
      const method = editingPrompt ? "PUT" : "POST";
      // TODO: fix prompt type
      data.type = 'system'
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok)
        throw new Error(editingPrompt ? "Failed to update prompt" : "Failed to create prompt");
      await fetchPrompts();
      setIsDialogOpen(false);
      reset();
      setEditingPrompt(null);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Oh Oh!",
        description: editingPrompt ? "Failed to update prompt" : "Failed to create prompt",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (window.confirm("Are you sure you want to delete this prompt?")) {
      try {
        setLoading(true);
        const response = await fetch(`/api/admin/prompt/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete prompt");
        const x = await fetchPrompts();
      } catch (err) {
        console.log("-----------------------------------------------------");
        console.log("error", err);
        console.log("-----------------------------------------------------");

        toast({
          variant: "destructive",
          title: "Delete Prompt Error",
          description: "Failed to delete Prompt",
        });
        // setError('Failed to delete prompt');
      } finally {
        setLoading(false);
      }
    }
  }

  function handleEdit(prompt_: typeof prompt.$inferInsert) {
    setEditingPrompt(prompt_);
    setValue("prompt", prompt_.prompt);
    setValue("type", prompt_.type || "");
    setIsDialogOpen(true);
  }
  const { toast } = useToast();

  return (
    <div className="container h-full p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Prompt Management</h1>

      <Dialog open={isDialogOpen}  onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              reset();
              setEditingPrompt(null);
            }}
          >
            <Plus className="w-4 h-4 mr-2" /> Add New Prompt
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[140rem]">
          <DialogHeader>
            <DialogTitle>{editingPrompt ? "Edit Prompt" : "Add New Prompt"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
            <Textarea rows={20} {...register("prompt")} placeholder="Prompt Title" required />
            <Input {...register("type")} placeholder="System" value={"system"} disabled={true} required />
            {/* <Input {...register("imageSrc")} placeholder="Image URL" /> */}

            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editingPrompt ? "Update" : "Create"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {loading && !promptState.length ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col w-full shadow-sm">
          {promptState.map((pr, id) => (
            <div key={id} className="flex flex-row-reverse w-full">
              <div className="flex justify-between w-[10%] p-4">
                <Button variant="primary" size="icon" className="mr-2" onClick={() => handleEdit(pr)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="danger" size="icon" onClick={() => handleDelete(pr.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-col w-[90%] h-[28rem] overflow-scroll p-4 bg-slate-100 ">
                <h3 className="p-2 font-bold ">{pr.type}</h3>
                <hr />
                <div className="p-2">

                <pre className="w-full break-words">{pr.prompt}</pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
