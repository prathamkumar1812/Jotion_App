"use client";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";
import { useSearch } from "@/hooks/use-search";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { File } from "lucide-react";

export const SearchCommand = () => {
    const { user } = useUser();
    const router = useRouter();
    const Documents = useQuery(api.documents.getSearch);
    const [isMounted, setIsMounted] = useState(false);
    const toggleSearch = useSearch((store) => store.toggle);
    const isOpen = useSearch((store) => store.isOpen);
    const onClose = useSearch((store) => store.onClose);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k"&&(e.metaKey||e.ctrlKey)) {
                e.preventDefault();
                toggleSearch();
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [toggleSearch]);

    const onSelect = (value: string) => {
        router.push(`/documents/${value}`);
        onClose();
    };

    if (!isMounted) {
        return null;
    }

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput placeholder={`Search ${user?.fullName}'s Zotion...`} />
            <CommandList>
                <CommandEmpty>No Result found.</CommandEmpty>
                <CommandGroup heading="Documents">
                    { Documents?.map((document) => (
                        <CommandItem
                            value={`${document._id}-${document.title}`}
                            title={document.title}
                            key={document._id}
                            onSelect={onSelect}
                        >
                            {document.icon ? (
                                <p className="m-2 text-[18px]">{document.icon}</p>
                            ) : (
                                <File className="mr-2 h-4 w-4" />
                            )}
                            <span>{document.title}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
};