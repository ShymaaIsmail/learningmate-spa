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
  fetchData: (body?: any) => void;
}


export class FetchReturn<T> implements UseFetchReturn<T> {
  isLoading: boolean;

  fetchData: (body?: any) => void;

  constructor() {
    this.isLoading = false;
    this.fetchData = (body?: any) => {
      // Empty implementation
    };
  }

  data!: T | null;
  
  error!: string | null;
}


const useFetch = <T>(options: FetchOptions | null): UseFetchReturn<T> => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  // Memoize the fetchData function to avoid it being recreated on every render
  const fetchData = useCallback(async () => {
    setState((prevState) => ({ ...prevState, isLoading: true, error: null }));

    try {
      if (options){
        console.log(options?.body)
        const response = await axiosInstance({
          url: options?.url,
          method: options?.method,
          data: options?.body,
        });
        setState({ data: response.data, isLoading: false, error: null });
      }
    } catch (err) {
      setState({ data: null, isLoading: false, error: (err as Error).message });
    }
  }, [options?.url, options?.method, options?.body]); // Use specific dependencies

  useEffect(() => {
    fetchData();
  }, [fetchData]); // fetchData is memoized, so it won't cause infinite loop

  return { ...state, fetchData };
};

export default useFetch;
