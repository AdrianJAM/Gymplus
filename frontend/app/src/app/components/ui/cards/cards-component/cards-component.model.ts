import { CardContent } from "./cards-component-content/cards-component-content.model";

export interface CardData {
  title: string;
  description?: string;
  descriptionIcon?: string;
  icon?: string;
  children?: CardData[];
  content?: CardContent;
}
