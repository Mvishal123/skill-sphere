"use client";

import { useClientAuthSession } from "@/hooks/client-session";
import { signOut } from "@/auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

import { LogOut, User2 } from "lucide-react";

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
          <Button variant="ghost" className="w-full">
            Profile
          </Button>

          {session && (
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => signOut()}
            >
              <LogOut className="w-4 h-4 rotate-180 mr-2 flex" /> <p>Log out</p>
            </Button>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileButton;
