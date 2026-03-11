import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";

interface ExtendedTooltipProps {
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

const ExtendedTooltip = ({ title, children }: ExtendedTooltipProps) => {
  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{title}</TooltipContent>
    </Tooltip>
  );
};

export default ExtendedTooltip;
