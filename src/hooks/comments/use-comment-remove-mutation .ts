import { api } from '@services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosPromise } from 'axios';

interface RemoveCommentData {
  id: string;
}

interface Response {
  statusCode?: number;
  post_id: string;
}

const removeComment = async ({
  id
}: RemoveCommentData): AxiosPromise<Response> => {
  const response = await api.delete<Response>(
    `http://localhost:3000/comments/${id}`
  );
  return response;
};

export function useRemoveCommentMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: removeComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['comment-post-', data.data.post_id]
      });
    }
  });

  return mutation;
}
