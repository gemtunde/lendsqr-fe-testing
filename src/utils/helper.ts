export const formatAmountWithCurrency = (amount: number, currency = "NGN") => {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(amount);
};

export function getInitials(name: string): string {
  if (!name) return "";
  const parts = name.trim().split(" ");
  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }
  const first = parts[0][0].toUpperCase();
  const last = parts[parts.length - 1][0].toUpperCase();

  return `${first}${last}`;
}

export function getStars(count: number): string {
  const maxStars = 5;
  const stars = Math.max(0, Math.min(count, maxStars));
  return "⭐️".repeat(stars);
}
