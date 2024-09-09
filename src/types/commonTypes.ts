export interface ApiError {
    message: string;
  }
export interface FetchState<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
  }
  
export interface FetchOptions {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: any; // For POST, PUT, PATCH requests
  }
