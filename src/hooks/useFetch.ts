// src/hooks/useFetch.ts
import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../api/axiosInstance';

interface FetchOptions {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any; // Optional body for POST, PUT, PATCH requests
}

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

interface UseFetchReturn<T> extends FetchState<T> {
  fetchData: () => void;
}

const useFetch = <T>(options: FetchOptions): UseFetchReturn<T> => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState({ ...state, isLoading: true, error: null });

    try {
      const response = await axiosInstance({
        url: options.url,
        method: options.method,
        data: options.body,
      });

      setState({ data: response.data, isLoading: false, error: null });
    } catch (err) {
      setState({ data: null, isLoading: false, error: (err as Error).message });
    }
  }, [options, state]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, fetchData };
};

export default useFetch;
