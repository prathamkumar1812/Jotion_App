"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { PlusCircleIcon } from "lucide-react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



function Page() {
  const {user}=useUser();
  const router=useRouter();
  const Create=useMutation(api.documents.createDocument);
  const onCreate=()=>{
     const promise=Create({title:"Untitled"}).then((documentId)=>{
        router.push(`/documents/${documentId}`)
        });
      toast.promise(promise,{
          loading:"Creating...",
          success:"Document Created",
          error:"Failed to create document"
      })

  }
  return (
    <div className="h-full flex items-center justify-center flex-col space-y-2">
      <h2>Welcome to {user?.firstName}&apos;
      s Zotion Clone!
      </h2>
      <Button onClick={onCreate}>
        <PlusCircleIcon className="h-4 w-4 mr-2"/>
        Create a Note
      </Button>
    </div>
  )
}

export default Page