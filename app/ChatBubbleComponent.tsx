import React from "react";
import { cn } from "@/lib/utils";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { parseContent } from "@/lib/parseContent";

interface Props {
  content: string;
  variant?: "chat" | "title" | "disclaimer";
  className?: string;
}

function ChatBubbleComponent({ content, variant = "chat", className }: Props) {
  const parsedContent = parseContent(content);

  return (
    <div
      className={cn(
        "flex flex-col w-fit max-w-[750px] text-xl p-5 bg-secondary50 rounded-e-3xl rounded-es-3xl",
        variant === "disclaimer" && "bg-[#FFC7C3] flex-row items-center gap-2",
        variant === "title" && "text-2xl bg-secondary100",
        className
      )}
    >
      {variant === "disclaimer" && (
        <ErrorOutlineIcon
          sx={{ width: 37, height: 37 }}
          className="text-[#FF5449]"
        />
      )}
      {parsedContent}
    </div>
  );
}

export default ChatBubbleComponent;
