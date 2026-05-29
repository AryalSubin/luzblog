import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePost } from '../../api/blog/blogApi';
import type { UpdatePostPayload } from '../../types/blog';

export function useUpdatePost(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdatePostPayload) => updatePost(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', id] });
    },
  });
}
