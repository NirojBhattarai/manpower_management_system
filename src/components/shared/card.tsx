import React from "react";

interface ICardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card = ({
  children,
  className = "",
  padding = "md",
}: ICardProps) => {
  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md border border-gray-200 ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
};
