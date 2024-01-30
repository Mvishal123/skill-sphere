import { useSession } from "next-auth/react";
export const useClientAuthSession = () => {
  const session = useSession();

  return session?.data?.user;
};
