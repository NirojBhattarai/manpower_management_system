import { Loader } from "lucide-react";

interface LoadingScreenProps {
  height?: number | string;
  message?: string;
}

const LoadingScreen = ({
  height = 0,
  message = "Loading, please wait...",
}: LoadingScreenProps) => {
  const containerStyle =
    height === 0
      ? { minHeight: "10vh" }
      : { height: typeof height === "number" ? `${height}px` : height };

  return (
    <div
      style={containerStyle}
      className="flex flex-col justify-center items-center bg-white/70 backdrop-blur-lg rounded-xl animate-fadeIn"
      role="status"
      aria-live="polite"
    >
      <div className="relative flex justify-center items-center">
        <div className="absolute bg-blue-400/30 blur-lg rounded-full w-8 h-8 animate-pulse" />
        <Loader
          className="relative w-6 h-6 text-blue-600 animate-spin"
          aria-hidden="true"
        />
      </div>
      {message && (
        <p className="mt-4 font-medium text-gray-700 text-sm tracking-wide">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingScreen;
