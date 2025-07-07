export interface Review {
  id: number;
  area: string;
  content: string;
  authorId: string | null;
  createdAt: string;
  category: string;
  rating: number;
}
