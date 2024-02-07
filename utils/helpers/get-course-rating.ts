interface Rating {
  rating: number;
}

export const getCourseRating = (arr: Rating[]) => {
  let sum = 0;
  arr.forEach((rev) => {
    sum += rev.rating;
  });

  const avg: number = sum / arr.length;
  return {
    rating: avg || 0,
    count: arr.length,
  };
};
