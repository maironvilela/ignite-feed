import { api } from '@services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosPromise } from 'axios';

interface PostData {
  id?: string;
  author: string;
  role: string;
  content: string;
  avatarUrl: string;
  publishedAt: Date;
}

const submit = async ({
  content,
  avatarUrl,
  publishedAt,
  author,
  role
}: PostData): AxiosPromise<PostData> => {
  const response = await api.post<PostData>('http://localhost:3000/posts', {
    content,
    avatarUrl,
    publishedAt,
    author,
    role
  });
  return response;
};

export function usePostMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: submit,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: [`post-data`]
      });
    }
  });

  return mutation;
}
