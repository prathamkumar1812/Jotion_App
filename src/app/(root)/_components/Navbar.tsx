"use client";
import { ModeToggle } from "@/components/mode_toggle";
import { Button } from "@/components/ui/button";
import {useScrollTop} from "@/hooks/use_scroll_top"
import { cn } from "@/lib/utils";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import Link from "next/link";


function Navbar() {
    const {isAuthenticated,isLoading}=useConvexAuth();
    console.log(isAuthenticated,isLoading);
    const scrolled=useScrollTop(10);
  return (
    <div className={cn("z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6",scrolled && "border-b  shadow-sm")}>
        <div className="md:ml-auto w-full md:justify-end flex justify-between items-center gap-x-2">
            {isLoading&&(<p>...Loading</p>)}
            {!isAuthenticated&&!isLoading&&(<><SignInButton>
                <Button variant="ghost" size={"sm"}>Sign Up</Button>
            </SignInButton>
            <SignUpButton >
                <Button  size={"sm"}>Get Zotion Free</Button>
            </SignUpButton></>)}
            {isAuthenticated&&!isLoading&&(<><Button variant={"ghost"} size="sm" asChild>
                <Link href="/documents">
                Enter Zotion
                </Link>

            </Button>
            <UserButton
            afterSwitchSessionUrl="/"/></>)}
            <ModeToggle/>
        </div>
    </div>
  )
}

export default Navbar