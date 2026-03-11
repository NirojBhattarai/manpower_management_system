/**
 * Capitalize first letter of a string
 */
export const capitalize = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  /**
   * Convert string to Title Case
   */
  export const toTitleCase = (str: string) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => capitalize(word))
      .join(" ");
  };
  
  /**
   * Truncate a string to specified length with "..."
   */
  export const truncateString = (str: string, maxLength: number) => {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength) + "...";
  };