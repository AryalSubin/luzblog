import axiosInstance from '../axiosConfig';
import type {
  Post,
  PostListResponse,
  CreatePostPayload,
  UpdatePostPayload,
} from '../../types/blog';

export async function getPosts(status?: string): Promise<PostListResponse> {
  const params = status ? { status } : {};
  const response = await axiosInstance.get<PostListResponse>('/posts/', { params });
  return response.data;
}

export async function getPost(id: string): Promise<Post> {
  const response = await axiosInstance.get<Post>(`/posts/${id}/`);
  return response.data;
}

export async function createPost(payload: CreatePostPayload): Promise<Post> {
  const response = await axiosInstance.post<Post>('/posts/', payload);
  return response.data;
}

export async function updatePost(id: string, payload: UpdatePostPayload): Promise<Post> {
  const response = await axiosInstance.patch<Post>(`/posts/${id}/`, payload);
  return response.data;
}

export async function deletePost(id: string): Promise<void> {
  await axiosInstance.delete(`/posts/${id}/`);
}
