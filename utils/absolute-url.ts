export const absoluteUrl = (path: string) => {
    //localhost -> relative URL
    if (typeof window !== "undefined") return path;

    // deployed on VERCEL
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}${path}`;
    }

    //localhost
    return `http://localhost:${process.env.PORT ?? 3000}${path}`;
  };