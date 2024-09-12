import { useEffect, useState } from 'react';

const useGetLoginToken = (googleToken: string) => {
  const [loginToken, setLoginToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoginToken = async () => {
      if (googleToken.length === 0) {
        // No token provided; do nothing
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${process.env.REACT_APP_LEARNING_API_URL}auth/login/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ google_token: googleToken }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setLoginToken(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoginToken();
  }, [googleToken]);

  return {
    loginToken,
    isLoading,
    error,
  };
};

export default useGetLoginToken;
