"use client";

import { useState } from "react";
import { TooltipContent } from "./tooltip";

import { Tooltip } from "./tooltip";

import { TooltipTrigger } from "./tooltip";

import { TooltipProvider } from "./tooltip";
import { cn } from "~/lib/utils";

const TooltipShad = ({
  trigger,
  content,
  className,
  onOpen,
}: {
  trigger: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  onOpen?: () => void;
}) => {
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip
        onOpenChange={(e) => {
          if (onOpen && e) onOpen();
          setIsOpenTooltip(e);
        }}
        open={isOpenTooltip}
      >
        <TooltipTrigger>{trigger}</TooltipTrigger>
        <TooltipContent className={cn("max-w-[240px]", className)}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipShad;
