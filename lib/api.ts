import { useQuery } from '@tanstack/react-query';
import { ApiResponse, QueryParams } from './types';

export const fetchCharacters = async (
  params: QueryParams
): Promise<ApiResponse> => {
  const queryParams = new URLSearchParams();
  if (params.status) queryParams.append('status', params.status);
  if (params.gender) queryParams.append('gender', params.gender);
  if (params.page) queryParams.append('page', params.page);

  const res = await fetch(
    `https://rickandmortyapi.com/api/character?${queryParams.toString()}`
  );
  if (!res.ok) throw new Error('Failed to fetch characters');
  return res.json();
};

export const useCharacters = (
  params: QueryParams,
  initialData?: ApiResponse
) => {
  return useQuery<ApiResponse>({
    queryKey: ['characters', params.status, params.gender, params.page],
    queryFn: () => fetchCharacters(params),
    initialData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
