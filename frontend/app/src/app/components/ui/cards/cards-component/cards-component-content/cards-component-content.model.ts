export interface CardContent {
  title: string;
  description: string;
  isAvailable: boolean;
  table?: {
    headers: string[];
    data: any[];
  };
}
