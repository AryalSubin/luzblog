export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface PostListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  status: 'draft' | 'published';
  created_at: string;
}

export interface PostListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PostListItem[];
}

export interface CreatePostPayload {
  title: string;
  content: string;
  excerpt?: string;
  status: 'draft' | 'published';
}

export type UpdatePostPayload = Partial<CreatePostPayload>;
