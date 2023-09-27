import React from "react";
import Icon from "./icon";
import { IconProps } from "./icon.types";

const ChevronUp: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 15.75l7.5-7.5 7.5 7.5"
      />
    </Icon>
  );
};

export default ChevronUp;
