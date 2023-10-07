import React from "react";
import { IconPropsContainer } from "./icon.types";

export const Icon: React.FC<IconPropsContainer> = ({
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
