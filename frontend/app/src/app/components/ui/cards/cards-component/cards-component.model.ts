import { CardButton } from './cards-component-button/cards-compontent-button.model';
import { CardContent } from './cards-component-content/cards-component-content.model';

export interface CardData<T = unknown> {
  title: string;
  description?: string;
  descriptionIcon?: string;
  icon?: string;
  children?: CardData<T>[];
  content?: CardContent<T>;
  Buttons?: CardButton[];
}
