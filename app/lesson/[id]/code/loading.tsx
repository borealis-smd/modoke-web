import Spinner from "@/components/ui/spinner";
import React from "react";

function Loading() {
  return (
    <div className="grid items-center justify-center h-full">
      <Spinner size={10} thickness={4} />
    </div>
  );
}

export default Loading;
