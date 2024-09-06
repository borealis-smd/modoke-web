import React from "react";

interface Props {
  content: string;
}

function ChatBubbleComponent({ content }: Props) {
  return (
    <div className="flex flex-col w-fit max-w-[750px] p-4 border-gray-200 bg-green-200 rounded-e-3xl rounded-es-3xl dark:bg-green-700">
      <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
        {content}
      </p>
    </div>
  );
}

export default ChatBubbleComponent;
