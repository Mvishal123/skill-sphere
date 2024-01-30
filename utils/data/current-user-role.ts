import { getServerAuthSession } from "./getServerAuthSession";

export const getUserRole = async () => {
  const session = await getServerAuthSession();

  return session?.role;
};
