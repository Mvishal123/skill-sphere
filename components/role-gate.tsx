import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";

interface RoleGateProps extends PropsWithChildren {
  allowedRole: UserRole;
  currentRole: UserRole;
  href?: string;
}
const RoleGate = ({
  children,
  allowedRole,
  currentRole,
  href = "/teach/verify",
}: RoleGateProps) => {
  if (currentRole !== allowedRole) {
    return redirect(href as string);
  }

  return <>{children}</>;
};

export default RoleGate;
