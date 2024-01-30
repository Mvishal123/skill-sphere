import React from "react";
import MaxWidthContainer from "../max-width-container";
import Link from "next/link";

import { Button } from "../ui/button";

import ProfileButton from "./profile-button";

const Navbar = async () => {
  return (
    <nav className="h-16 py-4 bg-slate-100 backdrop-blur-sm">
      <MaxWidthContainer>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">
            <Link href={"/"}>SkillSphere</Link>
          </h1>
          <div className="flex gap-12 items-center">
            <ul className="flex gap-6">
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
