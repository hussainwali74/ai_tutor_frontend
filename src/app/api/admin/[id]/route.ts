import { deleteUser, getUserById, getUsers, updateUser } from "@/db/queries/user.queries";
import { NextRequest, NextResponse } from "next/server";

// app/api/admines/[id]/route.ts

export async function GET(req: NextRequest) {
  try {
    const idStr = req.nextUrl.searchParams.get("id");
    let id;
    if (idStr) {
      id = parseInt(idStr);
      const admin = await getUserById(id);
      if (!admin) {
        return NextResponse.json({ error: "Topic not found" }, { status: 404 });
      }
      return NextResponse.json(admin);
    }
    const admins = await getUsers();
    if (!admins) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }
    return NextResponse.json(admins);
  } catch (error) {
    console.log("-----------------------------------------------------");
    console.log("error", error);
    console.log("-----------------------------------------------------");

    return NextResponse.json({ error: "Failed to fetch admin" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {

  try {

    let idstr = params.id ;
    if (idstr) {
      const id = parseInt(idstr, 10); // Convert string to number
      const data = await req.json();
      console.log('-----------------------------------------------------');
      console.log('data in put',data);
      console.log('-----------------------------------------------------');
      delete data['createdAt'];
      const updatedAdmin = await updateUser(id, data);
      console.log('-----------------------------------------------------');
      console.log('updatedAdmin',updatedAdmin);
      console.log('-----------------------------------------------------');
      
      return NextResponse.json(updatedAdmin);
    }
  } catch (error) {
    console.log("-----------------------------------------------------");
    console.log("error", error);
    console.log("-----------------------------------------------------");

    return NextResponse.json({ error: "Failed to update admin" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string }}) {

  try {
    
    let id = parseInt(params.id)
    if (id) {
      const deletedadmin = await deleteUser(id);

      console.log('-----------------------------------------------------');
      console.log('deletedadmin',deletedadmin);
      console.log('-----------------------------------------------------');
      
      return NextResponse.json(deletedadmin);
    }
  } catch (error) {
    console.log("-----------------------------------------------------");
    console.log("error", error);
    console.log("-----------------------------------------------------");

    return NextResponse.json({ error: "Failed to delete admin" }, { status: 500 });
  }
}
