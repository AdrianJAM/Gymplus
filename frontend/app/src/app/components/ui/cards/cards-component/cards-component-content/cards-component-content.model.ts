import { CardTable } from '../cards-component-table/cards-component-table.model';

export interface CardContent<T> {
  title?: string;
  description?: string;
  isAvailable?: boolean;
  table?: CardTable<T>; // Usar el nuevo modelo para la tabla
}