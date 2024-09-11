import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';

const useGetLoginToken = (googleToken: string) => {
  const [fetchOptions, setFetchOptions] = useState<{
    url: string;
    method: 'POST';
    body: string;
  } | null>(null);

  // Create fetchOptions only when googleToken is not empty
  useEffect(() => {
    if (googleToken.length > 0) {
      setFetchOptions({
        url: '/auth/login/',
        method: 'POST' as const,
        body: JSON.stringify({ token: googleToken }),
      });
    } else {
      setFetchOptions(null);
    }
  }, [googleToken]);

  const { data, isLoading, error, fetchData } = useFetch<string>(fetchOptions);

  // Call fetchData only when fetchOptions is set
  useEffect(() => {
    if (fetchOptions) {
      fetchData();
    }
  }, [fetchOptions, fetchData]);

  return {
    loginToken: data,
    isLoading,
    error,
    fetchData,
  };
};

export default useGetLoginToken;