"use client";

import { useClientAuthSession } from "@/hooks/client-session";
import { signOut } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

import { LogOut, User2 } from "lucide-react";
import Link from "next/link";

const ProfileButton = () => {
  const session = useClientAuthSession();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={""} alt="user photo" />
            <AvatarFallback className="border border-slate-200">
              <User2 />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {!session && (
            <Button className="w-full">
              <Link href="/auth/login">Sign in</Link>
            </Button>
          )}
          {session && (
            <div>
              <Button variant="ghost" className="w-full">
                Profile
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => signOut()}
              >
                <LogOut className="w-4 h-4 rotate-180 mr-2 flex" />{" "}
                <p>Log out</p>
              </Button>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileButton;
