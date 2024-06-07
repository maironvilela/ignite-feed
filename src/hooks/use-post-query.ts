import { Comments, Content } from '@components/Post';
import { useQuery } from '@tanstack/react-query';
import { AxiosPromise } from 'axios';
import { api } from '@services/api';

export interface PostData {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  publishedAt: Date;
  contents: Content[];
  comments: Comments[];
}

const fetchData = async (): AxiosPromise<PostData[]> => {
  const response = await api.get<PostData[]>('http://localhost:3000/posts');

  return response;
};

export function usePostQuery() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ['fetch-post-data'],
    retry: true,
    refetchInterval: 60 * 5 * 1000
  });

  const data = query.data?.data;

  return { ...query, data };
}
