export type PageParams = Record<string, string>;
export interface PageProps {
  params?: PageParams;
  searchParams?: Record<string, string | string[]>;
}
export type Contact = {
  id: number;
  createdAt: number; // timestamp
  first?: string;
  last?: string;
  favorite?: boolean;
  avatar?: string;
  twitter?: string;
  notes?: string;
};
