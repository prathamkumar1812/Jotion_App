
"use client";

import { useParams, useRouter } from "next/navigation";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";
import { Item } from "./Item";


interface DocumentListProps {
    parentDoucmentId: Id<"documents">;
    level?: number;
    data?:Doc<"documents">[];
}
function DocumentList({
    parentDoucmentId,
    level=0,
    data
}: DocumentListProps) {
    const params=useParams();
    const router=useRouter();
    const [expanded,setExpanded]=useState<Record<string,boolean>>({});
    const onExpend=(id:string)=>{
       setExpanded((prev)=>({
           ...prev,
           [id]:!prev[id]
       }))
    }
    const documents=useQuery(api.documents.getSidebar,{
        parentDocument:parentDoucmentId
    })
    const onRedirect=(documentId:string)=>{
      router.push(`/documents/${documentId}`);
    }
    if(documents==undefined){
        return (
            <>
            <Item.Skeleton level={level}/>
            {level==0&&(
                <>
                <Item.Skeleton level={level}/>
                <Item.Skeleton level={level}/>

                </>
            )}
            </>
        )
    }
    return (
        <>
        <p
        style={{paddingLeft:level?`${(level*12)+25}px`:undefined}}
        className={cn("hidden text-sm font-medium text-muted-foreground/80",
            expanded&&"last:block",
            level==0&&"hidden"
        )}>
            No pages inside
            </p>
            {
                documents.map((document)=>(
                   <div key={document._id}>
                     <Item
                    label={document.title}
                    id={document._id}    
                    icon={FileIcon}
                    onClick={()=>onRedirect(document._id)}
                    expanded={expanded[document._id]}
                    onExpend={()=>onExpend(document._id)}
                    level={level}
                    documentIcon={document.icon}
                    isActive={params.documentId===document._id}
                    />
                    {expanded[document._id]&&(
                        <DocumentList
                        parentDoucmentId={document._id}
                        level={level+1}
                        />
                    )}
                   </div>
                ))
            }
        </>
    )
}

export default DocumentList