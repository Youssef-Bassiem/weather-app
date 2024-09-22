import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Icon = ({ children, tip }) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{tip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Icon;
