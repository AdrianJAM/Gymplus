export interface CardButton {
  title?: string;
  action: () => void;
  icon?: string;
  color?: string;
  textcolor?: string;
  hovercolor?: string;
  hovertextcolor?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  tooltip?: string;
  disabled?: boolean;
}
