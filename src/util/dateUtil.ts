export const getCurrentEasternDate = (): Date => {
  const now = new Date();
  const easternTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);

  const [month, day, year] = easternTime.split("/");
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};

export const formatDateForApi = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// DEPRECATED: No longer used by DateSelector.
// DateSelector now uses API summary data.
// Consider removing if no other components use this.
export const getAvailableDateRange = (): Date[] => {
  const today = getCurrentEasternDate();
  const dates: Date[] = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date);
  }

  return dates;
};

export const formatDateForDisplay = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};
