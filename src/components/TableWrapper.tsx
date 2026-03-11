import React, { HTMLAttributes } from "react";
import LoadingScreen from "./reusable-component/LoadingScreen";
import { cn } from "@/lib/utils";
import NoDataFound from "./NoDataFound";

interface IProps {
  children: React.ReactNode;
  isLoading: boolean;
  wrapperClassName?: HTMLAttributes<HTMLDivElement>["className"];
  isDataAvailable?: boolean;
}

const TableWrapper = ({
  children,
  isLoading,
  wrapperClassName,
  isDataAvailable = true,
}: IProps) => {
  const isCentered = isLoading || !isDataAvailable;

  return (
    <div
      className={cn(
        `relative flex-1 rounded-[12px] overflow-hidden ${isDataAvailable ? "shadow-[0px_0px_2px_0px_#00000014,0px_1px_4px_0px_#454B571F,0px_0px_0px_1px_#98A1B21A]" : " "}`,
        isCentered && "flex items-center justify-center",
        wrapperClassName,
      )}
    >
      {isLoading ? (
        <LoadingScreen />
      ) : isDataAvailable ? (
        children
      ) : (
        <NoDataFound />
      )}
    </div>
  );
};

export default TableWrapper;
