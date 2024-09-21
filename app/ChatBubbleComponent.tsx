import React from "react";
import DOMPurify from "isomorphic-dompurify";
import CodeBlockComponent from "./lesson/CodeBlockComponent";
import { cn } from "@/lib/utils";

interface Props {
  content: string;
  variant?: "text" | "title";
}

function parseContent(content: string) {
  const elements: Array<JSX.Element> = [];
  let lastIndex = 0;
  const regex = /<Code language='(.*?)'>([\s\S]*?)<\/Code>/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const beforeCode = content.slice(lastIndex, match.index);

    if (beforeCode) {
      const sanitizedContent = DOMPurify.sanitize(beforeCode);
      elements.push(
        <div
          key={lastIndex}
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          className="mb-3"
        />
      );
    }

    const language = match[1].trim();
    const code = match[2].trim();
    elements.push(
      <CodeBlockComponent key={match.index} code={code} language={language} />
    );

    lastIndex = match.index + match[0].length;
  }

  const remainingContent = content.slice(lastIndex);
  if (remainingContent) {
    const sanitizedContent = DOMPurify.sanitize(remainingContent);
    elements.push(
      <div
        key={lastIndex}
        dangerouslySetInnerHTML={{
          __html: sanitizedContent,
        }}
      />
    );
  }

  return elements;
}

function ChatBubbleComponent({ content, variant = "text" }: Props) {
  const parsedContent = parseContent(content);

  return (
    <div
      className={cn(
        "flex flex-col w-fit max-w-[750px] p-5 bg-secondary50 rounded-e-3xl rounded-es-3xl",
        variant === "title" && "text-2xl bg-secondary100"
      )}
    >
      {parsedContent}
    </div>
  );
}

export default ChatBubbleComponent;
