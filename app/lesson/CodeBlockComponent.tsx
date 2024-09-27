import React from "react";
import { CodeBlock } from "react-code-block";
import { useCopyToClipboard } from "react-use";

import * as prettier from "prettier/standalone";
import * as htmlParser from "prettier/parser-html";
import * as babelParser from "prettier/parser-babel";
import * as cssParser from "prettier/parser-postcss";

interface Props {
  code: string;
  language: string;
  lineNumbers?: boolean;
}

function CodeBlockComponent({ code, language, lineNumbers = false }: Props) {
  const [state, copyToClipboard] = useCopyToClipboard();
  const [formattedCode, setFormattedCode] = React.useState<string>("");

  const copyCode = () => {
    copyToClipboard(code);
  };

  const formatCode = async (code: string, language: string) => {
    try {
      switch (language) {
        case "html":
          return prettier.format(code, {
            parser: "html",
            plugins: [htmlParser],
          });
        case "javascript":
        case "js":
          return prettier.format(code, {
            parser: "babel",
            plugins: [babelParser],
          });
        case "css":
          return prettier.format(code, {
            parser: "css",
            plugins: [cssParser],
          });
        default:
          return code;
      }
    } catch (error) {
      console.error("Erro ao formatar o código:", error);
      return code;
    }
  };

  React.useEffect(() => {
    const format = async () => {
      const result = await formatCode(code, language);
      setFormattedCode(result);
    };

    format();
  }, [code, language]);

  return (
    <CodeBlock code={formattedCode} language={language}>
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
