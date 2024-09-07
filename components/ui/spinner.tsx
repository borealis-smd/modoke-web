import React from "react";

interface SpinnerProps {
  size?: number;
  thickness?: number;
}

const Spinner = ({ size, thickness }: SpinnerProps) => {
  return (
    <div
      className={`inline-block h-${size ?? 4} w-${size ?? 4} animate-spin rounded-full border-${thickness ?? 2} border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default Spinner;
