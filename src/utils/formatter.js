export const currencyFormatter = (number) => {
  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  return formatter.format(number);
};
