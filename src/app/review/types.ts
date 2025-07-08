export interface Review {
  id: number;
  area: string;
  content: string;
  authorId: string | null;
  createdAt: string;
  categoryRatings: Record<string, number>;
  // category?: string;
  // rating?: number;
}
