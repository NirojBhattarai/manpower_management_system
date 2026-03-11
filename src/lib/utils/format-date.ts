import { format, parseISO, formatDistance, formatRelative } from "date-fns";

/**
 * Generic format using date-fns
 */
export function formatDate(date: Date | string, formatString: string): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, formatString);
}

/**
 * Format date to "MMM d, yyyy, hh:mm AM/PM" (using toLocaleString)
 */
export const formatDateTime = (date: string | Date) => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

/**
 * Format a date to "YYYY-MM-DD"
 */
export const formatLocalDateToYMD = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Format a date to "DD/MM/YYYY"
 */
export const formatDateDDMMYYYY = (date: Date | string) => {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "dd/MM/yyyy");
};

/**
 * Format a date to long format "MMMM do, yyyy"
 */
export const formatDateLong = (date: Date | string) => {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "MMMM do, yyyy");
};

/**
 * Relative distance, e.g., "3 days ago"
 */
export const formatDateDistance = (
  date: Date | string,
  baseDate: Date = new Date()
) => {
  const d = typeof date === "string" ? parseISO(date) : date;
  return formatDistance(d, baseDate, { addSuffix: true });
};

/**
 * Relative date format, e.g., "last Monday at 12:00 PM"
 */
export const formatDateRelative = (
  date: Date | string,
  baseDate: Date = new Date()
) => {
  const d = typeof date === "string" ? parseISO(date) : date;
  return formatRelative(d, baseDate);
};
