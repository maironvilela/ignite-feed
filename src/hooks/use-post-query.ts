import { useQuery } from '@tanstack/react-query';
import { AxiosPromise } from 'axios';
import { api } from '@services/api';

export interface PostData {
  id: string;
  author: string;
  role: string;
  avatarUrl: string;
  publishedAt: Date;
  content: string;
}

const fetchData = async (): AxiosPromise<PostData[]> => {
  const response = await api.get<PostData[]>('http://localhost:3000/posts');

  return response;
};

export function usePostQuery() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ['fetch-post-data']
  });

  const data = query.data?.data;

  return { ...query, data };
}
