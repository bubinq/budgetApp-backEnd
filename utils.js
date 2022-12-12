export const colors = {
  Rent: "rgb(78, 99, 71)",
  Utilities: "rgb(78, 99, 174)",
  Clothes: "rgb(78, 30, 174)",
  Groceries: "rgb(236, 30, 174)",
};

export const getDateRange = (year, month) => {
  const lastDay = new Date(year, month, 0).getDate();

  const prevTwoMonths = new Date(year, month - 3 === 0 ? 1 : month - 3);
  const prevTwoYear = prevTwoMonths.getFullYear();
  const prevTwoMonth = prevTwoMonths.getMonth();
  const prevTwoDate = new Date(
    year,
    month - 2,
    month - 2 === 1 ? 1 : 0
  ).getDate();

  return {lastDay, prevTwoYear, prevTwoMonth, prevTwoDate}
};
