import React from "react";
import DOMPurify from "dompurify";
import CodeBlockComponent from "./lesson/CodeBlockComponent";

interface Props {
  content: string;
}

function extractCodeBlock(content: string): string | null {
  const match = content.match(/<CodeBlockComponent (.*?)\/>/);
  if (!match) return null;

  return match[1]
    .replace(/code=/, "")
    .replace("{`", "")
    .replace("`}", "")
    .trim();
}

function ChatBubbleComponent({ content }: Props) {
  const hasCode = content.includes("<CodeBlockComponent");
  const codeBlock = hasCode ? extractCodeBlock(content) : null;
  const cleanContent = DOMPurify.sanitize(content);

  return (
    <div className="flex flex-col w-fit max-w-[750px] p-5 border-gray-200 bg-green-200 rounded-e-3xl rounded-es-3xl dark:bg-green-700">
      <p
        className="text-2xl font-normal py-2.5 text-gray-900 dark:text-white"
        dangerouslySetInnerHTML={{ __html: cleanContent }}
      ></p>
      {hasCode && codeBlock && (
        <CodeBlockComponent code={codeBlock} language="html" />
      )}
    </div>
  );
}

export default ChatBubbleComponent;
