import React from "react";
import MaxWidthContainer from "../max-width-container";
import Link from "next/link";

import { Button } from "../ui/button";

import ProfileButton from "./profile-button";
import StartTeachingButton from "./start-teaching-btn";

const Navbar = async () => {
  return (
    <nav className="h-16 py-4 backdrop-blur-sm">
      <MaxWidthContainer>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">
            <Link href={"/"}>SkillSphere</Link>
          </h1>
          <div className="flex gap-12 items-center">
            <div className="hidden md:block">
              <StartTeachingButton />
            </div>
            <ul className="hidden md:flex gap-6 ">
              <li>
                <Button variant="ghost" size="sm">
                  About
                </Button>
              </li>
              <li>
                <Button variant="ghost" size="sm">
                  Learn
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
