import { api } from '@services/api';
import { useQuery } from '@tanstack/react-query';
import { AxiosPromise } from 'axios';

export interface LikesComment {
  commentId: string;
  userId: string;
  id: string;
}

const fechData = async (commentId: string): AxiosPromise<LikesComment[]> => {
  const url = `http://localhost:3000/likes_comments?commentId=${commentId}`;
  const response = await api.get<LikesComment[]>(url);
  return response;
};

export function useLikesCommentQuery(commentId: string) {
  const query = useQuery({
    queryFn: async () => {
      const data = await fechData(commentId);
      return data;
    },
    queryKey: [`likes-comment-`, commentId]
  });

  const data = query.data?.data;
  return { ...query, data };
}
