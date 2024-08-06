import { SubjectInterface } from "@/app/models/interfaces";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

import React from 'react'

type Props = {
    Subjects:SubjectInterface[],
    handleEdit:(subject:SubjectInterface)=>void
    handleDelete:(subject_id:number)=>void
}

export default function SubjectListComponent({Subjects, handleEdit, handleDelete}:Props) {
  return (
    
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
      {Subjects.map((subject) => (
        <TableRow key={subject.id}>
          <TableCell>{subject.id}</TableCell>
          <TableCell>{subject.title}</TableCell>
          <TableCell>
            {subject.imageSrc && (
              <Image
              width={40}
              height={40}
                src={subject.imageSrc}
                alt={subject.title}
                className="object-cover w-10 h-10 rounded"
              />
            )}
          </TableCell>
          <TableCell>{new Date(subject.createdAt||'').toLocaleString()}</TableCell>
          <TableCell>
            <Button variant="default" size="sm" onClick={() => handleEdit(subject)} className="mr-2">
              <Pencil className="w-4 h-4" />
            </Button>
            <Button variant="danger" size="sm" onClick={() => handleDelete(subject.id!)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  )
}
