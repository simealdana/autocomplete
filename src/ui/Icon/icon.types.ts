export interface IconProps {
  strokeWidth?: number;
  strokeColor?: string;
  className?: string;
}

export interface IconPropsContainer extends IconProps {
  children: React.ReactNode;
}
