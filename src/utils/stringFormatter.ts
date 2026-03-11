export const formatModuleName = (value: string): string => {
  if (!value) return "";

  return (
    value
      // Split before capital letters (camelCase & PascalCase)
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      // Handle acronyms like HRManagement → HR Management
      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
      // Capitalize first letter of each word
      .replace(/\b\w/g, (char) => char.toUpperCase())
  );
};
