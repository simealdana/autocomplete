import React from "react";
import Icon from "./icon";
import { IconProps } from "./icon.types";

const CloseIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d="M3 3L21 21M3 21L21 3" />
    </Icon>
  );
};

export default CloseIcon;
