import React from "react";
import DOMPurify from "dompurify";
import CodeBlockComponent from "./lesson/CodeBlockComponent";

interface Props {
  content: string;
}

function parseContent(content: string) {
  const elements: Array<JSX.Element> = [];
  let lastIndex = 0;

  const regex = /<CodeBlockComponent code={`([\s\S]*?)`} language="(.*?)" \/>/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const beforeCode = content.slice(lastIndex, match.index);
    if (beforeCode) {
      const sanitazedContent = DOMPurify.sanitize(beforeCode);
      elements.push(
        <div
          key={lastIndex}
          dangerouslySetInnerHTML={{ __html: sanitazedContent }}
          className="mb-3"
        />
      );
    }
    const code = match[1].trim();
    const language = match[2].trim();
    elements.push(
      <CodeBlockComponent key={match.index} code={code} language={language} />
    );

    lastIndex = match.index + match[0].length;
  }

  const remainingContent = content.slice(lastIndex);
  if (remainingContent) {
    const sanitazedContent = DOMPurify.sanitize(remainingContent);
    elements.push(
      <div
        key={lastIndex}
        dangerouslySetInnerHTML={{
          __html: sanitazedContent,
        }}
      />
    );
  }

  return elements;
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
