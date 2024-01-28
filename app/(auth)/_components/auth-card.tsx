"use client";

import React from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";

interface AuthCardTemplateProps {
  children?: React.ReactNode;
  headerLabel: string;
  backLabel: string;
  backHref: string;
  showSocials?: boolean;
}

const AuthCardTemplate = ({
  children,
  headerLabel,
  backHref,
  backLabel,
  showSocials = false,
}: AuthCardTemplateProps) => {
  return (
    <div className="w-[520px] rounded-md p-4 space-y-4">
      <h1 className="text-center font-bold text-xl">{headerLabel}</h1>
      <div>{children}</div>
      <div className="">
        <Button asChild variant="link">
          <Link href={backHref}>{backLabel}</Link>
        </Button>
      </div>
      {showSocials && (
        <div className="space-y-3">
          <Separator className="w-60 mx-auto mb-2" />
          <p className="text-sm text-center text-slate-500">
            {headerLabel.toLocaleLowerCase() === "welcome back"
              ? "Sign in using"
              : "Sign up using"}
          </p>
          <div className="w-full flex justify-between gap-4">
            <Button variant="secondary" className="flex-1">
              <FaGithub className="mr-2" />
              GitHub
            </Button>
            <Button variant="secondary" className="flex-1">
              <FaGoogle className="mr-2" />
              Google
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthCardTemplate;
