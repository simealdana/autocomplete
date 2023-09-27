import React from "react";
import { IconProps } from "./icon.types";

const Icon: React.FC<IconProps> = ({
  strokeWidth = 1.5,
  strokeColor = "currentColor",
  className = "",
  children,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={strokeColor}
      className={className}
    >
      {children}
    </svg>
  );
};

export default Icon;
