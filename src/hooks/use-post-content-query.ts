import { useQuery } from '@tanstack/react-query';
import { AxiosPromise } from 'axios';
import { api } from '@services/api';

export interface PostContentsData {
  id: string;
  type: string;
  content: string;
}

const fetchData = async (postId: string): AxiosPromise<PostContentsData[]> => {
  const response = await api.get<PostContentsData[]>(
    `http://localhost:3000/contents?post-id=${postId}`
  );
  return response;
};

export function usePostContentQuery(postId: string) {
  const query = useQuery({
    queryFn: async () => {
      return await fetchData(postId);
    },
    queryKey: ['fetch-content-data']
  });

  const data = query.data?.data;

  return { ...query, data };
}
