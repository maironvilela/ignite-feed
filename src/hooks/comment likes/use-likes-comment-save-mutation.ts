import { api } from '@services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosPromise } from 'axios';

interface Response {
  commentId: string;
  userId: string;
  id: string;
}

interface RemoveLikeCommentProps {
  commentId: string;
  userId: string;
}

const removeLikeComment = async ({
  commentId,
  userId
}: RemoveLikeCommentProps): AxiosPromise<Response> => {
  const response = await api.post<Response>(
    `http://localhost:3000/likes_comments`,
    {
      commentId,
      userId
    }
  );

  return response;
};

export function useAddLikeComment() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: removeLikeComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [`likes-comment-`, data.data.commentId]
      });
    },
    onError: (error) => {
      //TODO: Implementar
      console.log({ error });
    }
  });

  return mutation;
}
