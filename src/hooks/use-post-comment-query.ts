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
  console.log('fetchData');
  const url = `http://localhost:3000/comments?post_id=${postId}&_sort=-publishedAt`;
  console.log(url);
  const response = await api.get<PostCommentsData[]>(url);
  return response;
};

export function usePostCommentQuery(postId: string) {
  const query = useQuery({
    queryFn: async () => {
      const data = await fetchData(postId);
      return data;
    },
    queryKey: ['comment-post-', postId]
  });

  const data = query.data?.data;

  return { ...query, data };
}
