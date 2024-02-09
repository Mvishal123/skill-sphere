"use client";

import { usePathname } from "next/navigation";
import MaxWidthContainer from "../max-width-container";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProfileButton from "../navbar/profile-button";

const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <header className="h-14 border-b">
      <MaxWidthContainer>
        <nav className="h-full flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <Link href="/mycourses"> SkillSphere</Link>
          </h1>

          <div className="flex">
            <Button variant="link" asChild className="group">
              <Link href="/mycourses">
                <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-all duration-75" />{" "}
                Back to my courses
              </Link>
            </Button>
            <ProfileButton />
          </div>
        </nav>
      </MaxWidthContainer>
    </header>
  );
};

export default Navbar;
