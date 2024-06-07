import { api } from '@services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosPromise } from 'axios';

interface CommentData {
  id?: string;
  comment: string;
  avatarUrl: string;
  publishedAt: Date;
  author: string;
}

const submit = async ({
  comment,
  avatarUrl,
  publishedAt,
  author
}: CommentData): AxiosPromise<CommentData> => {
  const response = await api.post<CommentData>('http://localhost:3000/posts', {
    comment,
    avatarUrl,
    publishedAt,
    author
  });
  return response;
};

export function usePostCommentMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: submit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['fetch-post-data'],
        refetchType: 'all'
      });
    }
  });

  return mutation;
}
