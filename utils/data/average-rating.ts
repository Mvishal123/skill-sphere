import { reverse } from "dns";

export type Rating = {
  rating: number;
};
export const getAverageRating = (
  reviews: Rating[],
  courseId: string
): number => {
  const len = reviews.length;
  if (len === 0) {
    return 0;
  }

  let sum = 0;
  reviews.forEach((obj: Rating) => {
    sum += obj.rating;
  });

  const average = sum / len;

  const rating = (average / 5) * 5;

  console.log({rating});
  

  return rating;
};
