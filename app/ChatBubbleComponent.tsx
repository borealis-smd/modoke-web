import React from "react";
import DOMPurify from "dompurify";
import CodeBlockComponent from "./lesson/CodeBlockComponent";

interface Props {
  content: string;
}

function parseContent(content: string) {
  const parts = content.split(
    /(<CodeBlockComponent code={`.*?`} language=".*?" \/>)/g
  );

  return parts.map((part, index) => {
    const codeMatch = part.match(
      /<CodeBlockComponent code={`([\s\S]*?)`} language="(.*?)" \/>/
    );

    if (codeMatch) {
      const code = codeMatch[1].trim();
      const language = codeMatch[2].trim();
      return <CodeBlockComponent key={index} code={code} language={language} />;
    } else {
      const cleanText = DOMPurify.sanitize(part);
      return (
        <p
          key={index}
          className="text-2xl font-normal py-2.5 text-gray-900 dark:text-white"
          dangerouslySetInnerHTML={{ __html: cleanText }}
        />
      );
    }
  });
}

function ChatBubbleComponent({ content }: Props) {
  const parsedContent = parseContent(content);

  return (
    <div className="flex flex-col w-fit max-w-[750px] p-5 border-gray-200 bg-green-200 rounded-e-3xl rounded-es-3xl dark:bg-green-700">
      {parsedContent}
    </div>
  );
}

export default ChatBubbleComponent;
