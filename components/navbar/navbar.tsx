import React from "react";
import MaxWidthContainer from "../max-width-container";
import Link from "next/link";

import { Button } from "../ui/button";

import ProfileButton from "./profile-button";
import StartTeachingButton from "./start-teaching-btn";

const Navbar = async () => {
  return (
    <nav className="w-full h-16 py-4 backdrop-blur-xl z-20 border">
      <MaxWidthContainer>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-3xl">
            <Link href={"/"}>
              Skill<span className="text-purply">Sphere</span>
            </Link>
          </h1>
          <div className="flex gap-12 items-center">
            <div className="hidden md:block">
              <StartTeachingButton />
            </div>
            <ul className="hidden md:flex gap-6 ">
              <li>
                <Button variant="ghost" size="sm">
                  <Link href={"/mycourses"}>My courses</Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/courses">Learn</Link>
                </Button>
              </li>
            </ul>
            <ProfileButton />
          </div>
        </div>
      </MaxWidthContainer>
    </nav>
  );
};

export default Navbar;
