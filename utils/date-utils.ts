export function todayIsoDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatMonthYear(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString(undefined, { month: "short", year: "numeric" });
}

export function formatPlayedSince(isoDate: string, today = new Date()): string {
  const start = new Date(isoDate);

  let months =
    (today.getFullYear() - start.getFullYear()) * 12 + (today.getMonth() - start.getMonth());

  if (today.getDate() < start.getDate()) {
    months -= 1;
  }
  
  months = Math.max(0, months);

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return remainingMonths <= 1 ? "New" : `${remainingMonths} mo`;
  }

  if (remainingMonths === 0) {
    return years === 1 ? "1 yr" : `${years} yrs`;
  }

  return `${years}${years === 1 ? "yr" : "yrs"} ${remainingMonths}mo`;
}
