import DOMPurify from "isomorphic-dompurify";
import CodeBlockComponent from "@/app/lesson/CodeBlockComponent";

export function parseContent(content: string) {
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
