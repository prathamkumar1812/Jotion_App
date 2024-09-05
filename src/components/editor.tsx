"use client";
import {useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from "@blocknote/mantine";

import "@blocknote/mantine/style.css";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useTheme } from 'next-themes';
import { useEdgeStore } from '@/lib/edgestore';
interface EditorProps {
    onChange:(content:string)=>void;
    initialContent?:string;
    editable?:boolean;
}
 const Editor=({onChange,editable,initialContent}:EditorProps)=>{
    const {resolvedTheme}=useTheme();
    const {edgestore}=useEdgeStore();
    const handleUpload=async(file:File)=>{
        const res=await edgestore.publicFiles.upload({
            file
        });
     return res.url;
    }
    const editor = useCreateBlockNote({
        initialContent:initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined, 
        uploadFile: handleUpload,
    });
    return (
        <div>
           <BlockNoteView editable={editable}  onChange={() => {
           
            // Use 'editor.blocks' instead of 'topLevelBlocks' to get the current content
            onChange(JSON.stringify(editor.document, null, 2));
          }} theme={resolvedTheme==="dark"?"dark":"light"} editor={editor} />
        </div>
    )
}
export default Editor;