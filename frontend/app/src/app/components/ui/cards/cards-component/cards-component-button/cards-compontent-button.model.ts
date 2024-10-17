export interface CardButton {
  title?: string;
  action: () => void;
  icon?: string;
  color?: string;
  textcolor?: string;
  hovercolor?: string;
  hovertextcolor?: string;
  tooltip?: string;
  disabled?: boolean;
}
