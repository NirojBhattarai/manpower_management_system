interface ISkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  variant?: "text" | "rectangular" | "circular";
}

export const Skeleton = ({
  width = "100%",
  height = "1rem",
  className = "",
  variant = "text",
}: ISkeletonProps) => {
  const variantClasses = {
    text: "rounded",
    rectangular: "rounded-md",
    circular: "rounded-full",
  };

  return (
    <div
      className={`
        animate-pulse bg-gray-300 ${variantClasses[variant]} ${className}
      `}
      style={{ width, height }}
    />
  );
};
