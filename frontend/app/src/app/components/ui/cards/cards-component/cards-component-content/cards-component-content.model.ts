export interface CardContent<T> {
  title?: string;
  description?: string;
  isAvailable?: boolean;
  table?: {
    headers: string[];
    data: T[];
  };
}
