import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../../api/blog/blogApi';
import type { CreatePostPayload } from '../../types/blog';

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreatePostPayload) => createPost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
