"use client";

import { ChevronDown, ChevronRight, Divide, LucideIcon, MoreHorizontal, Plus, Trash } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { DropdownMenuTrigger,DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { useUser } from "@clerk/clerk-react";

interface ItemProps {
    id?:Id<"documents">;
    documentIcon?:string;
    isActive?:boolean;
    expanded?:boolean;
    isSearch?:boolean;
    level?:number;
    onExpend?:()=>void;
    label: string;
    icon:LucideIcon;
    onClick?:()=>void;
}
export const Item=({label,onClick,icon:Icon,
    id,documentIcon,isActive,expanded,isSearch,level=0,onExpend
}: ItemProps)=> {
    const create=useMutation(api.documents.createDocument);
    const archive=useMutation(api.documents.archive);
    const onArchive=(
        event:React.MouseEvent<HTMLDivElement,MouseEvent>
    )=>{
        event.stopPropagation();
        if(!id){
            return;
        }
        const promise=archive({id}).then((documentId)=>{
            router.push("/documents");
        });
        toast.promise(promise,{
            loading:"Move to trash...",
            success:"Notes moved to trash",
            error:"Failed to move notes to trash"
        })

    }
    const {user}=useUser();
    const router=useRouter();
    const onCreate=(event:React.MouseEvent<HTMLDivElement,MouseEvent>)=>{
        event.stopPropagation();
        if(!id){
          return;
        }
        const promise=create({title:"Untitled",parentDocument:id})
        .then((documentId)=>{
            if(!expanded){
                onExpend?.();
            }
           router.push(`/documents/${documentId}`); 
        });
        toast.promise(promise,{
            loading:"Creating...",
            success:"Document Created",
            error:"Failed to create document"
        })
    }
    const handleExpend=(event:React.MouseEvent<HTMLDivElement,MouseEvent>)=>{
        event.stopPropagation();
        onExpend?.();
    }
    const ChevronIcon=expanded?ChevronDown:ChevronRight;
  return (
    <div
    onClick={onClick}
    role="button"
    style={{paddingLeft:level?`${(level*12)+12}px`:"12px"}}
    className={cn("group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5  flex items-center text-muted-foreground font-medium",
    isActive&&"bg-primary/5 text-primary",
   )}
    >
        {!!id&&(
            <div
            role="button"
            className=" h-full  rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
            onClick={handleExpend}>
               <ChevronIcon
               className="h-4 w-4 text-muted-foreground/50 shrink-0"/>
            </div>
        )}
        {documentIcon?(<div className="shrink-0 mr-2 text-[18px]">
            {documentIcon}
        </div>):
        (<Icon className=" shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground"/>)}
        <span className=" truncate">
        {label}
        </span>
        {isSearch&&(<kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-muted border px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">
            ⌘ 
            </span>K
        </kbd>)}
        {!!id&&(
            <div className="ml-auto flex items-center gap-x-2">
                <DropdownMenu>
                    <DropdownMenuTrigger 
                    onClick={(event)=>event.stopPropagation()}
                    asChild>
                        <div
                        className=" opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
                        role="button">
                            <MoreHorizontal className="h-4 w-4 text-muted-foreground"/>

                        </div>

                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                    className="w-60 "
                    align="start"
                    side="right"
                    forceMount>
                        <DropdownMenuItem onClick={onArchive}>
                            <Trash className="h-4 w-4  mr-2"/>
                            Delete
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <div className="text-sm text-muted-foreground p-2">
                            Last edited by {user?.fullName}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div
                role="button"
                onClick={onCreate}
                 className=" opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
               <Plus className="h-4 w-4 text-muted-foreground"/>
                </div>
               
            </div>
        )}
        
        </div>
  )
}

Item.Skeleton= function ItemSkeleton({level}:{level?:number}){
    return(
        <div
        className="flex gap-x-2 py-[3px]"
        style={{paddingLeft:level?`${(level*12)+25}px`:"12px"}}>
       <Skeleton className="h-4 w-4 "/>
       <Skeleton className="h-4 w-[30%] "/>
        </div>
    )
}


