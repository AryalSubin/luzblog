import { useQuery } from '@tanstack/react-query';
import { getPost } from '../../api/blog/blogApi';

export function useGetPost(id: string) {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => getPost(id),
    enabled: !!id,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}
