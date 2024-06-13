import { api } from '@services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosPromise } from 'axios';

interface Response {
  commentId: string;
  userId: string;
  id: string;
}

const removeLikeComment = async (commentId: string): AxiosPromise<Response> => {
  const response = await api.delete<Response>(
    `http://localhost:3000/likes_comments/${commentId}`
  );

  return response;
};

export function useRemoveLikeComment() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: removeLikeComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [`likes-comment-`, data.data.commentId]
      });
    },
    onError: (error) => {
      console.log({ error });
    }
  });

  return mutation;
}
