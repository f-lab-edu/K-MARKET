export interface Category {
  created_at: Date;
  id: number;
  level: number;
  name: string;
  parent_id: number | null;
}
