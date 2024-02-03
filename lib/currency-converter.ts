export const currencyConverter = (price: number) => {
  const convertedPrice = Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
  return convertedPrice;
};
