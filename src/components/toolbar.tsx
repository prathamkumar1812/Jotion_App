"use client";

import { ImageIcon, Smile, X } from "lucide-react";

import { Doc } from "../../convex/_generated/dataModel";
import TextareaAutosize from "react-textarea-autosize"
import { IconPicker } from "./icon-picker";
import { Button } from "./ui/button";
import { ElementRef, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useCoverImage } from "@/hooks/use-cover-image";

interface ToolbarProps {
    initialData: Doc<"documents">;
    preview?:boolean;
}
export const Toolbar=({initialData,preview}:ToolbarProps)=>{
    const inputRef=useRef<ElementRef<"textarea">>(null);
    const [isEditing ,setIsEditing]=useState(false);
    const [value,setValue]=useState(initialData.title);
    const update=useMutation(api.documents.update);
    const coverImage=useCoverImage();
    const removeIcon=useMutation(api.documents.removeIcon)
    const enableInput=()=>{
        if(preview){
            return ;
        }
        setIsEditing(true);
        setTimeout(()=>{
            setValue(initialData.title);
            inputRef.current?.focus();
        },0);
    }
    const disableInput=()=>{
        setIsEditing(false);
    }
    const onInput=(value:string)=>{
        setValue(value);
        update({
            id:initialData._id,
            title:value||"Untitled"
        })
    }
    const keyDown=(event:React.KeyboardEvent<HTMLTextAreaElement>)=>{
        if(event.key==="Enter"){
            event.preventDefault();
            disableInput();
        }
    }
    const onIconSelect=(icon:string)=>{
        update({
            id:initialData._id,
            icon
        })
    }
    const onRemoveIcon=()=>{
        removeIcon({
            id:initialData._id
        })
    }
    return(
        <div className="pl-[54px] group relative">
         {initialData.icon&&!preview&&<div className="group/icon gap-x-2 flex items-center pt-6">
         <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transtion">{initialData.icon}</p>
         </IconPicker>
         <Button className="rounded-full opacity-0 group-hover:opacity-100 transition text-muted-foreground text-xs" variant={"outline"} size={"icon"} onClick={onRemoveIcon}>
            <X className="h-4 w-4 "/>
         </Button>
            </div>}
            {!!initialData.icon && preview &&(
                <p className="text-6xl pt-6">
                    {initialData.icon}
                </p>
            )}
            <div className="opacity-0 group-hover:opacity-100 flex item-center gap-x-1 py-4">
                {!initialData.icon&&!preview&&(
                    <IconPicker asChild onChange={onIconSelect}>
                       <Button className="text-muted-foreground text-xs" variant={"outline"} size={"sm"}>
                        <Smile className="h-4 w-4 mx-2 "/>
                        Add Icon
                       </Button>
                    </IconPicker>
                )}
            {
                !initialData.coverImage&&!preview&&(
                    <Button
                    size={"sm"}
                    onClick={coverImage.onOpen}
                    className="text-muted-foreground text-xs" variant={"outline"}>
                        <ImageIcon className="h-4 w-4 mr-2"/>
                        Add Cover
                    </Button>
                )
            }
            </div>
            {isEditing&&!preview?(
                <TextareaAutosize
                onKeyDown={(e)=>onkeydown}
                value={value}
                className="text-5xl bg-transparent font-bold break-words outline-none text-[#3f3f3f] dark:text-[#CFCFCF] resize-none"
                onChange={(e)=>onInput(e.target.value)}
                 ref={inputRef} onBlur={disableInput}/>
            ):(
                <div
                onClick={enableInput}
                className="pb-[11.5px] text-5xl font-bold break-words outline-none cursor-pointer text-[#3f3f3f] dark:text-[#CFCFCF]">
                
                    {initialData.title}
                </div>
            )}
        </div>
    )
}