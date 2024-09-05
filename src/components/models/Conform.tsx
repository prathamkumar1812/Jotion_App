"use client"

import React from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

interface ConformProps {
    children: React.ReactNode;
    onConform: () => void;
}
const Conform = ({children,onConform}:ConformProps) => {
  const handleConfirm =(event:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
     event.stopPropagation();
        onConform();
  }
  return (
    <AlertDialog>
        <AlertDialogTrigger onClick={(e)=>e.stopPropagation()} asChild>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Are you sure you want to delete this item?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={(e)=>e.stopPropagation()}>
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirm} >
                   Confirm
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default Conform