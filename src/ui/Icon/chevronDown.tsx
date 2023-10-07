import React from "react";

import Icon from "./icon";
import { IconProps } from "./icon.types";

export const ChevronDown: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </Icon>
  );
};

export default ChevronDown;
