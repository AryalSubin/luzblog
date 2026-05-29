import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '../../api/blog/blogApi';

export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
