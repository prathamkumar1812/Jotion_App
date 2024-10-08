import { useRouter } from "next/navigation";
import { Id } from "../../../../convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger,DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash } from "lucide-react";


interface MenuProps {
    doucmentId: Id<"documents">;
}
export const Menu = ({doucmentId}:MenuProps) => {
    const router=useRouter();
    const user=useUser();
    const archive=useMutation(api.documents.archive);
    const OnArchive=()=>{
        const promise=archive({id:doucmentId});
        toast.promise(promise,{
            loading:"Archiving...",
            success:"Document archived",
            error:"Failed to archive document"
        })
        router.push("/documents");
    }
  return (
   <DropdownMenu>
    <DropdownMenuTrigger asChild>
   <Button size="sm" variant={"ghost"} >
    <MoreHorizontal className="h-4 w-4"/>
   </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-60" align="end" alignOffset={8} forceMount>
        <DropdownMenuItem onClick={OnArchive}>
            <Trash className="h-4 w-4 mr-2"/>
            Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <div className="text-xs text-muted-foreground p-2">
            Last edited by {user.user?.fullName}
        </div>

    </DropdownMenuContent>
   </DropdownMenu>
  )
}

