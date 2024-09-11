import React from "react";
import { CodeBlock } from "react-code-block";
import { useCopyToClipboard } from "react-use";

interface Props {
  code: string;
  language: string;
  lineNumbers?: boolean;
}

function CodeBlockComponent({ code, language, lineNumbers = false }: Props) {
  const [state, copyToClipboard] = useCopyToClipboard();

  const copyCode = () => {
    copyToClipboard(code);
  };

  return (
    <CodeBlock code={code} language={language}>
      <div className="relative">
        <CodeBlock.Code className="bg-gray-900 !p-6 !pt-11 rounded-xl shadow-lg">
          <div className="table-row">
            {lineNumbers && (
              <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
            )}
            <CodeBlock.LineContent className="table-cell text-wrap">
              <CodeBlock.Token />
            </CodeBlock.LineContent>
          </div>
        </CodeBlock.Code>

        <button
          className="bg-white rounded-full px-3.5 py-1.5 absolute top-2 right-2 text-sm font-semibold"
          onClick={copyCode}
        >
          {state.value ? "Copiado!" : "Copiar código"}
        </button>
      </div>
    </CodeBlock>
  );
}

export default CodeBlockComponent;
