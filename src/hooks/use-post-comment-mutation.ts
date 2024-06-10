import { api } from '@services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosPromise } from 'axios';

interface CommentData {
  id?: string;
  comment: string;
  avatarUrl: string;
  publishedAt: Date;
  author: string;
  post_id: string;
}

const submit = async ({
  comment,
  avatarUrl,
  publishedAt,
  author,
  post_id
}: CommentData): AxiosPromise<CommentData> => {
  const response = await api.post<CommentData>(
    'http://localhost:3000/comments',
    {
      comment,
      avatarUrl,
      publishedAt,
      author,
      post_id
    }
  );
  return response;
};

export function usePostCommentMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: submit,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['comment-post-', data.data.post_id]
      });
    }
  });

  return mutation;
}
