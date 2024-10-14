export interface CardData {
  title: string;
  description?: string;
  descriptionIcon?: string;
  icon?: string;
  children?: CardData[];
  content?: any;
}
