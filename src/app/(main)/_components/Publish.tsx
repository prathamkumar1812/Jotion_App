"use client";

import { useOrigin } from "@/hooks/use-origin";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, Copy, Globe } from "lucide-react";

interface PublishProps {
    initialData:Doc<"documents">;
}
export const Publish=({initialData}:PublishProps)=>{
    const origin=useOrigin();
    const update=useMutation(api.documents.update);
    const [copyed,setCopyed]=useState(false);
    const [isSubmitting,setIsSubmitting]=useState(false);
    const url=`${origin}/preview/${initialData._id}`;
    const onPublish=()=>{
        setIsSubmitting(true);
        const promise=update({
            id:initialData._id,
            isPublished:true
        }).finally(()=>{
            setIsSubmitting(false);
        });
        toast.promise(promise,{
            loading:"Publishing...",
            success:"Published",
            error:"Failed to publish"
        })
      
    }
    const onUnpublish=()=>{
        setIsSubmitting(true);
        const promise=update({
            id:initialData._id,
            isPublished:false
        }).finally(()=>{
            setIsSubmitting(false);
        });
        toast.promise(promise,{
            loading:"Unpublishing...",
            success:"Unpublished",
            error:"Failed to unpublish"
        })
      
    }
    const onCopy=()=>{
        navigator.clipboard.writeText(url).then(()=>{
            setCopyed(true);
            setTimeout(()=>{
                setCopyed(false);
            },1000)
        })

    }
    return(
       <Popover>
        <PopoverTrigger asChild> 
         <Button size={"sm"} variant={"ghost"}>
            Publish
          {initialData.isPublished&&<Globe className="h-4 w-4 ml-2 text-sky-500"/>}
         </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
            {initialData.isPublished?(
                <div className="space-y-4 ">
                   <div
                   className="flex items-center gap-x-2">
                    <Globe className="text-sky-500 h-4 w-4 animate-pulse"/>
                    <p className="text-xs font-medium text-sky-500">
                        This note is live on web.
                    </p>
                   </div>
                   <div className="flex items-center">
                    <input disabled value={url} className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate" />
                    <Button onClick={onCopy} disabled={copyed} className="h-8 rounded-l-none">
                        {copyed?(
                            <Check className="h-4 w-4"/>
                        ):(
                            <Copy className="h-4 w-4"/>
                        )}
                    </Button>
                   </div>
                   <Button onClick={onUnpublish} size={"sm"} className="w-full text-xs"
                   disabled={isSubmitting}>
                          Unpublish
                   </Button>
                </div>
            ):(
                <div className="flex flex-col items-center justify-center">
                    <Globe className="h-8 w-8  text-muted-foreground mb-2"/>
                    <p className="text-sm font-medium mb-2">Publish this note</p>
                    <span className="text-xs text-muted-foreground mb-4">
                      Share you work with the others.
                    </span>
                    <Button
                    disabled={isSubmitting} onClick={onPublish} className="w-full text-xs" size={"sm"}>
                      Publish
                    </Button>

                </div>
            )}

        </PopoverContent>

       </Popover>
    )
}