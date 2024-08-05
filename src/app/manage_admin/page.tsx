"use client";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import Modal from "@/components/modal";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { UserInterface } from "@/app/models/interfaces";
// import "../"
import "../globals.css";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Pencil, Trash2 } from "lucide-react";
interface Role {
  id: string;
  value: string;
}
export default function Admins() {
  const { register, handleSubmit, control, reset } =
    useForm<Omit<UserInterface, "id" | "createdAt" | "updatedAt" | "deletedAt">>();

  const [loading, setLoading] = useState(true);

  const [admins, setAdmins] = useState<UserInterface[]>([]);
  const [roles, setRoles] = useState<Role[]>([
    { id: "superadmin", value: "Super Admin" },
    { id: "admin", value: "Admin" },
  ]);
  const [editAdmin, setEditAdmin] = useState<UserInterface | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch initial admins data
    fetchAdmins();
  }, []);
  const fetchAdmins = async () => {
    const res = await axios.get("/api/admin");
    console.log("-----------------------------------------------------");
    console.log("res", res);
    console.log("-----------------------------------------------------");
    setAdmins(res.data);
  };

  const onSubmit = async (data: Omit<UserInterface, "id" | "createdAt" | "updatedAt" | "deletedAt">) => {
    if (editAdmin) {
      // Update existing admin
      console.log("-----------------------------------------------------");
      console.log("edit submit data", data);
      console.log("-----------------------------------------------------");

      await axios.put(`/api/admin/${editAdmin.id}`, data);
    } else {
      // Create new admin
      await axios.post("/api/admin", data);
    }
    reset();
    setEditAdmin(null);
    setIsModalOpen(false);
    // Refetch data
    await fetchAdmins();
  };

  const handleEdit = (admin: UserInterface) => {
    setEditAdmin(admin);
    reset(admin);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`/api/admin/${id}`);
    // Refetch data
    axios.get("/api/admin").then((response) => {
      setAdmins(response.data);
    });
  };

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Admin Management</h1>
      <Button onClick={() => setIsModalOpen(true)}>Add New Admin</Button>
      {loading && !admins.length ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <Table className="h-20 mt-6 overflow-scroll">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins?.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.id}</TableCell>
                <TableCell>{admin.name}</TableCell>
                <TableCell>{admin.role}</TableCell>

                <TableCell>{new Date(admin.createdAt || "").toLocaleString()}</TableCell>
                <TableCell>
                  <Button variant="default" size="sm" onClick={() => handleEdit(admin)} className="mr-2">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(admin.id!)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
        <Card className="p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
            {/* <Input
              {...register('clerk_id')}
              placeholder="Clerk ID"
              className="mb-4"
            /> */}
            <Input {...register("name")} placeholder="Name" />
            {/* <Input {...register('name')} placeholder="Name"  /> */}
            <Input {...register("email")} placeholder="Email" />
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select
                  disabled={!roles.length && !isEditing}
                  defaultValue={field.value?.toString()}
                  name={field.name}
                  onValueChange={field.onChange}
                  value={field.value?.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" className="mb-4" />
                  </SelectTrigger>
                  <SelectContent className="mb-4">
                    {roles.map((role) => (
                      <SelectItem key={role?.id} value={role.id?.toString() || "-"}>
                        {role.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" className="mr-2">
                {editAdmin ? "Update" : "Create"}
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            </div>
          </form>
        </Card>
      </Modal>
    </div>
  );
}
