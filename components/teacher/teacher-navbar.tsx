import React from "react";
import MaxWidthContainer from "../max-width-container";
import Link from "next/link";

import { Button } from "../ui/button";

import ProfileButton from "@/components/navbar/profile-button";

import { LogOutIcon } from "lucide-react";
import { getUserRole } from "@/utils/data/current-user-role";
import { UserRole } from "@prisma/client";

const Navbar = async () => {
  const currentRole = await getUserRole();
  const isAdmin = currentRole === UserRole.ADMIN;

  return (
    <nav className="h-16 py-4 backdrop-blur-3xl border-b">
      <MaxWidthContainer>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">
            <Link href={"/"}>SkillSphere</Link>
          </h1>
          <div className="flex gap-12 items-center">
            <div className="hidden md:block">
              <Button variant={"ghost"} size="sm" asChild>
                <Link href={"/"}>
                  <LogOutIcon className="mr-2 w-4 h-4" />
                  Exit
                </Link>
              </Button>
            </div>
            {isAdmin && (
              <ul className="hidden md:flex gap-6 ">
                <li>
                  <Button size="sm" asChild>
                    <Link href="/teach/create">Create</Link>
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/teach/courses">Courses</Link>
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/teach/dashboard">Dashboard</Link>
                  </Button>
                </li>
              </ul>
            )}
            {!isAdmin && (
              <ul>
                <li>
                  <Button size={"sm"} asChild>
                    <Link href="/teach/verify">Become a teacher</Link>
                  </Button>
                </li>
              </ul>
            )}
            <ProfileButton />
          </div>
        </div>
      </MaxWidthContainer>
    </nav>
  );
};

export default Navbar;
