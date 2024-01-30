import React from "react";
import MaxWidthContainer from "./max-width-container";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="h-16 py-4 bg-slate-100 backdrop-blur-sm">
      <MaxWidthContainer>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">
            <Link href={"/"}>SkillSphere</Link>
          </h1>
          <ul className="flex gap-4">
            <li>nav_item</li>
            <li>nav_item</li>
            <li>nav_item</li>
          </ul>
        </div>
      </MaxWidthContainer>
    </nav>
  );
};

export default Navbar;
