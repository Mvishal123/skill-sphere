import { auth } from "@/auth";

export const getServerAuthSession = async () => {
  const session = await auth();

  return session;
};
