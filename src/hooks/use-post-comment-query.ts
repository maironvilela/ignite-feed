import { useQuery } from '@tanstack/react-query';
import { AxiosPromise } from 'axios';
import { api } from '@services/api';

export interface PostCommentsData {
  id: string;
  type: string;
  avatarUrl: string;
  comment: string;
  author: string;
  publishedAt: Date;
}

const fetchData = async (postId: string): AxiosPromise<PostCommentsData[]> => {
  const response = await api.get<PostCommentsData[]>(
    `http://localhost:3000/comments?post-id=${postId}`
  );
  return response;
};

export function usePostCommentQuery(postId: string) {
  console.log({ postId });

  const query = useQuery({
    queryFn: async () => {
      return await fetchData(postId);
    },
    queryKey: ['fetch-comment-data']
  });

  const data = query.data?.data;

  return { ...query, data };
}
