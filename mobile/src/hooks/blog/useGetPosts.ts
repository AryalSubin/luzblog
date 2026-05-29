import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../api/blog/blogApi';

export function useGetPosts(status?: string) {
  return useQuery({
    queryKey: ['posts', status],
    queryFn: () => getPosts(status),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}
